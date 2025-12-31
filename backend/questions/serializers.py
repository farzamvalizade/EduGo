from rest_framework import serializers

from .models import Question, Choice

# Create your serializers here.


class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("stage", "title", "type", "order")


class ChoiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("question", "text", "is_correct")
