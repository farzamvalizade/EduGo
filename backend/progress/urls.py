from django.urls import path

from .views import (
    StudentProgressView,
    StudentStatView,
    CompleteSubjectView,
    CertificateListView,
)

urlpatterns = [
    path("me/progress/", StudentProgressView.as_view(), name="student-progress"),
    path("me/stat/", StudentStatView.as_view(), name="student-stat"),
    path(
        "subjects/<int:subject_id>/complete/",
        CompleteSubjectView.as_view(),
        name="complete-subject",
    ),
    path("certificates/", CertificateListView.as_view(), name="certificate-list"),
]
