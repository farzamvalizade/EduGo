from django.db import models
from django.contrib.auth import get_user_model
from questions.models import Question

User = get_user_model()


class Contest(models.Model):
    STATUS_CHOICES = [
        ("waiting", "در انتظار حریف"),
        ("playing", "در حال بازی"),
        ("finished", "پایان یافته"),
    ]

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_contests"
    )
    opponent = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="joined_contests",
        null=True,
        blank=True,
    )

    questions = models.ManyToManyField(Question)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="waiting")

    creator_score = models.PositiveIntegerField(default=0)
    opponent_score = models.PositiveIntegerField(default=0)

    creator_submitted = models.BooleanField(default=False)
    opponent_submitted = models.BooleanField(default=False)

    winner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="contests_won",
    )
    is_draw = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contest {self.id} - {self.creator.username} vs {self.opponent.username if self.opponent else 'None'}"
