from django.urls import path
from .views import (
    JoinOrCreateContestView,
    SubmitAnswersView,
    ContestStatusView,
    CancelWaitingContestView,
)

urlpatterns = [
    path(
        "contest/join-or-create/",
        JoinOrCreateContestView.as_view(),
        name="join-or-create-contest",
    ),
    path(
        "contest/<int:contest_id>/submit/",
        SubmitAnswersView.as_view(),
        name="submit-contest-answers",
    ),
    path(
        "contest/<int:contest_id>/status/",
        ContestStatusView.as_view(),
        name="contest-status",
    ),
    path(
        "contest/<int:contest_id>/cancel/",
        CancelWaitingContestView.as_view(),
        name="cancel-contest",
    ),
]
