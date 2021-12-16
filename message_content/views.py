from django.shortcuts import render

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Message
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # status code
from .serializers import PopulatedMessageSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class MessageDetailView(APIView):

    def delete(self, request, pk):
        try:
            message = Message.objects.get(id=pk)
            message.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        message = Message.objects.get(id=pk)  # django ORM method to grab
        updated_message = PopulatedMessageSerializer(
            message, data=request.data)
        if updated_message.is_valid():
            updated_message.save()
            return Response(updated_message.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_message.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        message = Message.objects.get(id=pk)
        serialized_message = PopulatedMessageSerializer(message)
        return Response(serialized_message.data, status=status.HTTP_200_OK)


class MessageListView(APIView):

    # permission_classes = (IsOwnerOrReadOnly)

    def post(self, request):
        message = MessageSerializer(data=request.data)
        if message.is_valid():
            message.save(owner=request.user)
            return Response(message.data, status=status.HTTP_201_CREATED)
        else:
            return Response(message.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # responder to GET /cats/
    def get(self, request):
        messages = Message.objects.all()
        serialized_messages = PopulatedMessageSerializer(messages, many=True)
        return Response(serialized_messages.data, status=status.HTTP_200_OK)
