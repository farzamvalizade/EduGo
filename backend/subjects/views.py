from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
)
from rest_framework import permissions

from .models import Subject, LessonStage
from .serializers import (
    SubjectSerializer,
    SubjectCreateSerializer,
    LessonStageSerializer,
    LessonStageCreateSerializer,
)

# Create your views here.


class SubjectListView(ListAPIView):
    queryset = Subject.objects.filter(is_active=True)
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
