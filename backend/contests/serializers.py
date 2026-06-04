from rest_framework import serializers
from .models import Contest
from questions.serializers import (
    QuestionSerializer,
)


class ContestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    creator_username = serializers.CharField(source="creator.username", read_only=True)
    opponent_username = serializers.CharField(
        source="opponent.username", read_only=True
    )

    class Meta:
        model = Contest
        fields = [
            "id",
            "creator_username",
            "opponent_username",
            "status",
            "creator_score",
            "opponent_score",
            "creator_submitted",
            "opponent_submitted",
            "winner",
            "is_draw",
            "questions",
        ]
