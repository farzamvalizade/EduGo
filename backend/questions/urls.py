from django.urls import path

from .views import CheckAnswersView, QuestionCreateView, StageQuestionListView

urlpatterns = [
    path(
        "subjects/<int:subject_id>/stages/<int:stage_id>/check/",
        CheckAnswersView.as_view(),
        name="check-answers",
    ),
    path("questions/create/", QuestionCreateView.as_view(), name="questions-create"),
    path(
        "stages/<int:stage_id>/questions/",
        StageQuestionListView.as_view(),
        name="stage-questions",
    ),
]
