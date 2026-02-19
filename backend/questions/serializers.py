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


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ["id", "text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    options = ChoiceSerializer(source="choice_set", many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "title", "type", "order", "options"]
