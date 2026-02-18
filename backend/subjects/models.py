from django.db import models

# Create your models here.


class Subject(models.Model):
    title = models.CharField(max_length=255, verbose_name="عنوان")
    description = models.TextField(verbose_name="توضیحات")
    image = models.FileField(upload_to="subjects/", verbose_name="عکس")
    is_active = models.BooleanField(default=True, verbose_name="فعال/غیرفعال")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="ساخته شده")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "درس"
        verbose_name_plural = "درس‌ها"
        ordering = ["-created_at"]


class LessonStage(models.Model):
    subject = models.ForeignKey(
        Subject, related_name="stages", on_delete=models.CASCADE, verbose_name="درس"
    )
    title = models.CharField(max_length=255, verbose_name="عنوان")
    order = models.PositiveIntegerField(verbose_name="ترتیب")
    content = models.TextField(verbose_name="محتوا")
    pass_score = models.PositiveIntegerField(default=0, verbose_name="نمره")
    xp_reward = models.PositiveIntegerField(default=0, verbose_name="xp")
    is_active = models.BooleanField(default=True, verbose_name="فعال/غیرفعال")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="ساخته شده")

    def __str__(self):
        return f"{self.title} - {self.subject.title}"

    class Meta:
        verbose_name = "مرحله"
        verbose_name_plural = "مرحله‌ها"
        ordering = ["order"]
