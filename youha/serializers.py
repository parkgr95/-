from rest_framework import serializers
from .models import highlightVid, User, chatFlow, originalVid,audioFlow,topWords, sentiment, TwitchChapter
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.serializers import ModelSerializer

#접속 유지중인지
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email","name")

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "name", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"], None, validated_data["password"]
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

class chatFlowSerializer(ModelSerializer):
    class Meta:
        model = chatFlow
        fields = '__all__'

class audioFlowSerializer(ModelSerializer):
    class Meta:
        model = audioFlow
        fields = '__all__'

class topWordsSerializer(ModelSerializer):
    class Meta:
        model = topWords
        fields = '__all__'

class sentimentSerializer(ModelSerializer):
    class Meta:
        model = sentiment
        fields = '__all__'

class OriginalVidSerializer(serializers.ModelSerializer):
    class Meta:
        model = originalVid
        fields = '__all__'

class StreamerSerializer(serializers.ModelSerializer):
    class Meta:
        model = originalVid
        fields = ("name",)

class TwitchChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwitchChapter
        fields = '__all__'

class highlightVidSerializer(serializers.ModelSerializer):
    class Meta:
        model = highlightVid
        fields = '__all__'

class downloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = originalVid
        fields = '__all__'