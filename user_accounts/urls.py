from django.urls import path
from . import views
from .views import UserListView, UserDetailView, RegisterView, LoginView, createChat

urlpatterns = [
    path('', UserListView.as_view()),
    path('<int:pk>/', UserDetailView.as_view()),
    path('<int:pk>/chats/', createChat.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
]
