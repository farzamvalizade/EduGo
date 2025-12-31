from django.urls import path

from .views import CheckAnswersView, QuestionCreateView

urlpatterns = [
    path(
        "subjects/<int:subject_id>/stages/<int:stage_id>/check/",
        CheckAnswersView.as_view(),
        name="check-answers",
    ),
    path("questions/create/", QuestionCreateView.as_view(), name="questions-create"),
]
