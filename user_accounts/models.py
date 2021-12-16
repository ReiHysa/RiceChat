from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=100, unique=True, blank=False)
    password = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=500, unique=True, blank=False)
    profilepicture = models.CharField(max_length=5000, blank=True)
    chats = models.ManyToManyField("chat.Chat", blank=True)
    messages = models.ManyToManyField("message_content.Message", blank=True)

    def __str__(self):
        return "User" + self.username
 