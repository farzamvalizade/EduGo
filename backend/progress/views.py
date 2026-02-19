from django.shortcuts import get_object_or_404


from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from subjects.models import Subject
from .models import StudentProgress, StudentStat, Certificate
from .serializers import (
    StudentProgressSerializer,
    StudentStatSerializer,
    CertificateSerializer,
)

# Create your views here.


class StudentProgressView(ListAPIView):
    serializer_class = StudentProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StudentProgress.objects.filter(user=self.request.user)


class StudentStatView(ListAPIView):
    serializer_class = StudentStatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StudentStat.objects.filter(user=self.request.user)


class CompleteSubjectView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, subject_id):
        subject = get_object_or_404(Subject, id=subject_id, is_active=True)

        total_stages_count = subject.stages.count()

        passed_stages_count = StudentProgress.objects.filter(
            user=request.user, stage__subject=subject, is_passed=True
        ).count()

        if total_stages_count > 0 and passed_stages_count >= total_stages_count:
            certificate, created = Certificate.objects.get_or_create(
                user=request.user, subject=subject
            )

            if created:
                return Response(
                    {
                        "message": f"تبریک! شما درس {subject.title} را به پایان رساندید.",
                        "certificate_id": certificate.id,
                    },
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"message": "گواهی این درس قبلاً برای شما صادر شده است."},
                    status=status.HTTP_200_OK,
                )


class CertificateListView(ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Certificate.objects.filter(user=self.request.user)
