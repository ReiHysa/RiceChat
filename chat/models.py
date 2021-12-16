from django.db import models
from django.contrib.auth.models import User


class Chat(models.Model):
    message = models.ManyToManyField("message_content.Message", blank=True)
    users = models.ManyToManyField(
        "user_accounts.User", blank=True)

    def __str__(self):
        return "Chat" + f'{self.id}'
