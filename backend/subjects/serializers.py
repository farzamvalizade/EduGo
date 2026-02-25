from rest_framework import serializers

from .models import Subject, LessonStage
from progress.models import StudentProgress

# Create your serializers here.


class SubjectSerializer(serializers.ModelSerializer):
    stages_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Subject
        fields = "__all__"


class SubjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ("title", "description", "image", "is_active")


# serializers.py


class LessonStageSerializer(serializers.ModelSerializer):
    is_locked = serializers.SerializerMethodField()
    is_passed = serializers.SerializerMethodField()

    class Meta:
        model = LessonStage
        fields = (
            "id",
            "subject",
            "title",
            "order",
            "content",
            "pass_score",
            "xp_reward",
            "is_active",
            "created_at",
            "is_locked",
            "is_passed",
        )

    def get_is_passed(self, obj):
        user = self.context["request"].user
        return StudentProgress.objects.filter(
            user=user, stage=obj, is_passed=True
        ).exists()

    def get_is_locked(self, obj):
        user = self.context["request"].user

        if obj.order == 1:
            return False

        prev_stage = LessonStage.objects.filter(
            subject=obj.subject, order=obj.order - 1
        ).first()

        if not prev_stage:
            return True

        return not StudentProgress.objects.filter(
            user=user, stage=prev_stage, is_passed=True
        ).exists()


class LessonStageCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonStage
        fields = (
            "subject",
            "title",
            "order",
            "content",
            "pass_score",
            "xp_reward",
            "is_active",
        )
