from contextlib import closing
from django.shortcuts import render

from django.http.response import HttpResponse
from django.shortcuts import render

from user_accounts.models import User
from .models import Chat
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # status code
from .serializers import PopulatedChatSerializer, ChatSerializer


class ChatDetailView(APIView):

    def delete(self, request, pk):
        try:
            chat = Chat.objects.get(id=pk)
            chat.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):

        chat = Chat.objects.get(id=pk)  # django ORM method to grab
        updated_chat = ChatSerializer(chat, data=request.data)

        if updated_chat.is_valid():
            updated_chat.save()
            return Response(updated_chat.data, status=status.HTTP_202_ACCEPTED)
        else:
            print('nope')
            return Response(updated_chat.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        chat = Chat.objects.get(id=pk)
        serialized_chat = PopulatedChatSerializer(chat)
        return Response(serialized_chat.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        chat = Chat.objects.get(id=pk)
        print(chat)
        print(chat.message)
        chat.message.add(request.data)
        chat.save()
        return Response(request.data, status=status.HTTP_201_CREATED)


class ChatListView(APIView):

    def get(self, request):
        chats = Chat.objects.all()
        serialized_chats = PopulatedChatSerializer(chats, many=True)
        return Response(serialized_chats.data, status=status.HTTP_200_OK)

    def post(self, request):
        chats = ChatSerializer(data=request.data)
        if chats.is_valid():
            chats.save()
            return Response(chats.data, status=status.HTTP_201_CREATED)
        else:
            return Response(chats.errors, status=status.HTTP_200_OK)
