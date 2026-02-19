from django.db import transaction
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework import status, permissions

from subjects.models import LessonStage
from progress.models import StudentProgress, StudentStat
from .models import Question, Choice
from .serializers import (
    QuestionCreateSerializer,
    ChoiceCreateSerializer,
    QuestionSerializer,
)

# Create your views here.


class CheckAnswersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, subject_id, stage_id):
        stage = get_object_or_404(LessonStage, id=stage_id, is_active=True)
        user_answers = request.data.get("answers", {})

        if not user_answers:
            return Response(
                {"error": "پاسخی ارسال نشده است."}, status=status.HTTP_400_BAD_REQUEST
            )

        correct_count = 0
        questions = stage.questions.all()
        total_questions = questions.count()

        for question in questions:
            submitted_choice_id = user_answers.get(str(question.id))

            if submitted_choice_id:
                is_correct = Choice.objects.filter(
                    id=submitted_choice_id,
                    question=question,
                    is_correct=True,
                ).exists()

                if is_correct:
                    correct_count += 1

        score = correct_count
        is_passed = score >= stage.pass_score

        with transaction.atomic():
            progress, created = StudentProgress.objects.get_or_create(
                user=request.user,
                stage=stage,
                defaults={"score": score, "is_passed": is_passed},
            )

            was_already_passed = not created and progress.is_passed
            progress.score = max(progress.score, score)
            progress.is_passed = progress.is_passed or is_passed
            progress.save()

            stat, _ = StudentStat.objects.get_or_create(user=request.user)

            xp_gained = 0
            if is_passed and not was_already_passed:
                xp_gained = stage.xp_reward
                stat.total_xp += xp_gained

                stat.level = stat.total_xp // 500

            today = timezone.now().date()
            last_activity_date = stat.last_activity_date.date()

            if last_activity_date == today:
                pass

            elif last_activity_date == today - timezone.timedelta(days=1):
                stat.streak += 1
            else:
                stat.streak = 0

            stat.last_activity_date = timezone.now()
            stat.save()

        return Response(
            {
                "is_passed": is_passed,
                "score": score,
                "total_questions": total_questions,
                "xp_gained": xp_gained,
                "current_streak": stat.streak,
                "current_level": stat.level,
            },
            status=status.HTTP_200_OK,
        )


class QuestionCreateView(CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer
    permission_classes = [permissions.IsAdminUser]


class ChoiceCreateView(CreateAPIView):
    queryset = Choice.objects.all()
    serializer_class = ChoiceCreateSerializer
    permission_classes = [permissions.IsAdminUser]


class StageQuestionListView(ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        stage_id = self.kwargs.get("stage_id")

        stage = get_object_or_404(LessonStage, id=stage_id, is_active=True)

        return Question.objects.filter(stage=stage).prefetch_related("choice_set")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
