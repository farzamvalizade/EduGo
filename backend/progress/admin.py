from django.contrib import admin

from .models import StudentProgress, StudentStat

# Register your models here.

admin.site.register(StudentProgress)
admin.site.register(StudentStat)
