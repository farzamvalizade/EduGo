from django.db import models
from django.conf import settings

# Create your models here.


class Contact(models.Model):
    TYPES_CHOICES = (
        ("bug", "گزارش اشکال"),
        ("suggestion", "پیشنهاد"),
        ("question", "سوال"),
        ("other", "دیگر"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="contacts"
    )

    type = models.CharField(max_length=20, choices=TYPES_CHOICES)
    subject = models.CharField(max_length=200)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject

    class Meta:
        verbose_name = "ارتباط"
        verbose_name_plural = "ارتباط‌ها"
        ordering = ["-created_at"]
