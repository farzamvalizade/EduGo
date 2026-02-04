from django.shortcuts import get_object_or_404
from django.db.models import Count, OuterRef, Subquery, Q, IntegerField
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
)
from rest_framework.response import Response
from rest_framework import permissions

from progress.models import StudentProgress

from .models import Subject, LessonStage
from .serializers import (
    SubjectSerializer,
    SubjectCreateSerializer,
    LessonStageSerializer,
    LessonStageCreateSerializer,
)

# Create your views here.


class SubjectListView(ListAPIView):
    queryset = Subject.objects.filter(is_active=True).annotate(
        stages_count=Count("stages", filter=Q(stages__is_active=True))
    )
    serializer_class = SubjectSerializer
    permission_classes = [permissions.AllowAny]


class SubjectCreateView(CreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectCreateSerializer
    permission_classes = [permissions.IsAdminUser]


class LessonStageListView(ListAPIView):
    serializer_class = LessonStageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        subject = get_object_or_404(
            Subject, id=self.kwargs.get("subject_id"), is_active=True
        )
        return subject.stages.filter(is_active=True)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class LessonStageDetailView(RetrieveAPIView):
    queryset = LessonStage.objects.filter(is_active=True)
    serializer_class = LessonStageSerializer
    permission_classes = [permissions.IsAuthenticated]


class LessonStageCreateView(CreateAPIView):
    queryset = LessonStage.objects.all()
    serializer_class = LessonStageCreateSerializer
    permission_classes = [permissions.IsAdminUser]


class IncompleteSubjectsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        total_stages_subquery = (
            LessonStage.objects.filter(subject_id=OuterRef("pk"))
            .values("subject_id")
            .annotate(total=Count("id"))
            .values("total")
        )

        completed_stages_subquery = (
            StudentProgress.objects.filter(
                stage__subject_id=OuterRef("pk"), user=user, is_passed=True
            )
            .values("stage__subject_id")
            .annotate(completed=Count("stage", distinct=True))
            .values("completed")
        )

        subjects = Subject.objects.annotate(
            total_count=Subquery(total_stages_subquery, output_field=IntegerField()),
            completed_count=Subquery(
                completed_stages_subquery, output_field=IntegerField()
            ),
        ).filter(completed_count__gt=0)

        data = []
        for s in subjects:
            total = s.total_count or 0
            completed = s.completed_count or 0

            if 0 < completed < total:
                data.append(
                    {
                        "lesson_id": s.id,
                        "title": s.title,
                        "completedStage": completed,
                        "totalStage": total,
                    }
                )

        return Response(data)
