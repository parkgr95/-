from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

#접속 유지중인지
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email","name")

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "name", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"], None, validated_data["password"]
        )
        return user

class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    name = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

