from rest_framework import serializers

from .models import StudentProgress, StudentStat, Certificate

# Create your serializers here.


class StudentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProgress
        fields = "__all__"


class StudentStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentStat
        fields = "__all__"


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"
