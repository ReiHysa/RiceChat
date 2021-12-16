from django.urls import path
from . import views
from .views import MessageListView
from .views import MessageDetailView

urlpatterns = [
    path('<int:pk>/', MessageDetailView.as_view()),
    path('', MessageListView.as_view()),
]
