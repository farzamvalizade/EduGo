from django.db import models
from django.contrib.auth.models import User
from subjects.models import Subject, LessonStage

# Create your models here.


class StudentProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="کاربر")
    stage = models.ForeignKey(
        LessonStage,
        on_delete=models.CASCADE,
        related_name="student_progress",
        verbose_name="مرحله",
    )
    score = models.PositiveIntegerField(default=0, verbose_name="نمره")
    is_passed = models.BooleanField(default=False, verbose_name="پذیرفته")
    completed_at = models.DateTimeField(auto_now_add=True, verbose_name="تکمیل شده")

    def __str__(self):
        return f"{self.user.username} - {self.stage.title}"

    class Meta:
        verbose_name = "پیشرفت"
        verbose_name_plural = "پیشرفت‌ها"
        ordering = ["-completed_at"]


class StudentStat(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="کاربر")
    total_xp = models.PositiveIntegerField(default=0, verbose_name="تمام xp")
    level = models.PositiveIntegerField(default=0, verbose_name="لول")
    streak = models.PositiveIntegerField(default=0, verbose_name="ستریک")
    last_activity_date = models.DateTimeField(
        auto_now_add=True, verbose_name="آخرین فعالیت"
    )

    def __str__(self):
        return f"{self.user.username} - {self.level}"

    class Meta:
        verbose_name = "آمار"
        verbose_name_plural = "آمارها"
        ordering = ["-last_activity_date"]


class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="کاربر")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="درس")
    issued_at = models.DateTimeField(auto_now_add=True, verbose_name="ارائه شده")

    def __str__(self):
        return f"{self.user.username} - {self.subject.title}"

    class Meta:
        verbose_name = "گواهی"
        verbose_name_plural = "گواهی‌ها"
        ordering = ["-issued_at"]
