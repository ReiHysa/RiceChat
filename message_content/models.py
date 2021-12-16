from django.db import models

# Create your models here.


class Message(models.Model):
    message_datetime = models.DateTimeField(auto_now_add=True)
    message_text = models.CharField(max_length=300, blank=False)
    owner = models.ForeignKey("user_accounts.User",
                              on_delete=models.CASCADE, null=True, related_name='owner', blank=True)

    def __str__(self):
        return "Message:" + self.message_text
