from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Contest
from questions.models import Question, Choice
from progress.models import StudentStat
from .serializers import ContestSerializer
import random


class JoinOrCreateContestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user

        available_contest = (
            Contest.objects.filter(status="waiting").exclude(creator=user).first()
        )

        if available_contest:
            available_contest.opponent = user
            available_contest.status = "playing"
            available_contest.save()

            serializer = ContestSerializer(available_contest)
            return Response(
                {"message": "به رقابت متصل شدید.", "contest": serializer.data},
                status=status.HTTP_200_OK,
            )

        else:
            all_questions = list(Question.objects.all())
            if len(all_questions) < 3:
                return Response(
                    {"error": "تعداد سوالات سیستم برای شروع مسابقه کافی نیست."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            random_questions = random.sample(all_questions, 3)

            new_contest = Contest.objects.create(creator=user, status="waiting")
            new_contest.questions.set(random_questions)
            new_contest.save()

            serializer = ContestSerializer(new_contest)
            return Response(
                {
                    "message": "مسابقه ایجاد شد. در انتظار حریف...",
                    "contest": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )


class SubmitAnswersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, contest_id):
        user = request.user
        contest = get_object_or_404(Contest, id=contest_id)

        if contest.status != "playing":
            return Response(
                {"error": "این مسابقه در حال جریان نیست."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user != contest.creator and user != contest.opponent:
            return Response(
                {"error": "شما عضو این مسابقه نیستید."},
                status=status.HTTP_403_FORBIDDEN,
            )

        submitted_choice_ids = request.data.get("answers", [])

        correct_answers_count = Choice.objects.filter(
            id__in=submitted_choice_ids,
            question__in=contest.questions.all(),
            is_correct=True,
        ).count()

        if user == contest.creator:
            if contest.creator_submitted:
                return Response(
                    {"error": "شما قبلاً پاسخ خود را ارسال کرده‌اید."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            contest.creator_score = correct_answers_count
            contest.creator_submitted = True
        else:
            if contest.opponent_submitted:
                return Response(
                    {"error": "شما قبلاً پاسخ خود را ارسال کرده‌اید."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            contest.opponent_score = correct_answers_count
            contest.opponent_submitted = True

        contest.save()

        if contest.creator_submitted and contest.opponent_submitted:
            contest.status = "finished"

            creator_stat, _ = StudentStat.objects.get_or_create(user=contest.creator)
            opponent_stat, _ = StudentStat.objects.get_or_create(user=contest.opponent)

            if contest.creator_score > contest.opponent_score:
                contest.winner = contest.creator
                creator_stat.total_xp += 200
                opponent_stat.total_xp += 50
            elif contest.opponent_score > contest.creator_score:
                contest.winner = contest.opponent
                opponent_stat.total_xp += 200
                creator_stat.total_xp += 50
            else:
                contest.is_draw = True
                creator_stat.total_xp += 100
                opponent_stat.total_xp += 100

            creator_stat.save()
            opponent_stat.save()
            contest.save()

            return Response(
                {
                    "message": "مسابقه پایان یافت و امتیازها توزیع شد.",
                    "contest": ContestSerializer(contest).data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "پاسخ شما ثبت شد. در انتظار ثبت پاسخ حریف...",
                "contest": ContestSerializer(contest).data,
            },
            status=status.HTTP_200_OK,
        )


class ContestStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, contest_id):
        contest = get_object_or_404(Contest, id=contest_id)
        serializer = ContestSerializer(contest)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelWaitingContestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, contest_id):
        contest = get_object_or_404(Contest, id=contest_id)

        if contest.creator != request.user:
            return Response(
                {"error": "شما مجاز به لغو این مسابقه نیستید."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if contest.status != "waiting":
            return Response(
                {
                    "error": "مسابقه شروع شده است یا دیگر در وضعیت انتظار نیست و نمی‌توان آن را لغو کرد."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        contest.delete()

        return Response(
            {"message": "مسابقه با موفقیت لغو شد."}, status=status.HTTP_200_OK
        )
