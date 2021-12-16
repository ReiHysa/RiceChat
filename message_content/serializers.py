from django.db.models import fields
from rest_framework import serializers

from user_accounts.serializers import UserSerializer


from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class PopulatedMessageSerializer(MessageSerializer):
    owner = UserSerializer(many=False)
