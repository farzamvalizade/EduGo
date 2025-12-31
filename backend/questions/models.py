from django.db import models
from subjects.models import LessonStage

# Create your models here.


class Question(models.Model):
    QUESTION_TYPES = [
        ("multiple-choice", "چند گزینه‌ای"),
        ("true-or-false", "صحیح یا غلط"),
    ]

    stage = models.ForeignKey(
        LessonStage,
        on_delete=models.CASCADE,
        related_name="questions",
        verbose_name="مرحله",
    )
    title = models.CharField(max_length=255, verbose_name="سؤال")
    type = models.CharField(max_length=50, choices=QUESTION_TYPES, verbose_name="نوع")
    order = models.PositiveIntegerField(verbose_name="ترتیب سؤال")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.stage.title} - Q{self.order}"

    class Meta:
        ordering = ["order"]
        unique_together = ("stage", "order")
        verbose_name = "سؤال"
        verbose_name_plural = "سؤال‌ها"


class Choice(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, verbose_name="سؤال"
    )
    text = models.CharField(max_length=255, verbose_name="متن")
    is_correct = models.BooleanField(default=False, verbose_name="صحیح")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="ساخته شده")

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = "انتخاب"
        verbose_name_plural = "انتخاب‌ها"
        ordering = ["-created_at"]
