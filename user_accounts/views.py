from django.db.models import manager
from django.shortcuts import render
from django.http.response import HttpResponse
from chat.serializers import ChatSerializer
from django.contrib.auth.hashers import check_password


from user_accounts import serializers

from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.exceptions import PermissionDenied
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# User = get_user_model()

# Create your views here.


class UserDetailView(APIView):

    def post(self, request, pk):
        updateChats = User.objects.get(id=pk)
        updateChats.chats.add(request.data)
        updateChats.save()
        return Response(request.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, pk):
        us = User.objects.get(id=pk)
        us.delete()
        return Response(status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        us = User.objects.get(id=pk)
        updated_us = UserSerializer(us, data=request.data)
        if updated_us.is_valid():
            updated_us.save()
            return Response(updated_us.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_us.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        us = User.objects.get(id=pk)
        serialized_us = UserSerializer(us)
        print(f'{serialized_us} has gotten their details')
        return Response(serialized_us.data, status=status.HTTP_200_OK)


class UserListView(APIView):
    def post(self, request):
        us = UserSerializer(data=request.data)
        if us.is_valid():
            us.save()
            return Response(us.data, status=status.HTTP_201_CREATED)
        else:
            return Response(us.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request):
        list_of_users = User.objects.all()
        serialized_users = UserSerializer(list_of_users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(f'{serializer} has registered')

            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)

        if not user.password:
            raise PermissionDenied({'message': 'Invalid credentials!'})

        print(f'{user} has logged in and gotten a token')

        token = jwt.encode(
            {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'id': user.id, 'message': f'Welcome back {user.username}!'})


class createChat(APIView):

    def post(self, request, pk):
        chat = ChatSerializer(data=request.data)
        other_user = User.objects.get(id=pk)
        print('This is the other User!', other_user)
        print(request.user)
        if chat.is_valid():
            chat.save(users=[request.user, other_user])
            return Response(chat.data, status=status.HTTP_201_CREATED)
        else:
            print('wrong')
            return Response(chat.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
