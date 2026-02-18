from django.urls import path

from .views import (
    SubjectListView,
    SubjectCreateView,
    LessonStageListView,
    LessonStageDetailView,
    LessonStageCreateView,
    IncompleteSubjectsView,
    UserCompletedStages,
)

urlpatterns = [
    path("subjects/", SubjectListView.as_view(), name="subjects"),
    path("subjects/create/", SubjectCreateView.as_view(), name="subjects-create"),
    path(
        "subjects/<int:subject_id>/stages/",
        LessonStageListView.as_view(),
        name="stages",
    ),
    path(
        "subjects/<int:subject_id>/stages/<int:pk>/",
        LessonStageDetailView.as_view(),
        name="stages",
    ),
    path(
        "subjects/stages/create/", LessonStageCreateView.as_view(), name="stages-create"
    ),
    path(
        "incomplete-stages/", IncompleteSubjectsView.as_view(), name="stages-incomplete"
    ),
    path(
        "user-completed-stages/", UserCompletedStages.as_view(), name="stages-completed"
    ),
]
