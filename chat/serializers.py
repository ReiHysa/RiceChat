from django.core.checks import messages
from django.db.models import manager
from rest_framework import serializers
from .models import Chat
from user_accounts.serializers import UserSerializer
from message_content.serializers import PopulatedMessageSerializer


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'


class PopulatedChatSerializer(ChatSerializer):
    message = PopulatedMessageSerializer(many=True)
    users = UserSerializer(many=True)
