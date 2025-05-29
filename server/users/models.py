from django.contrib.auth.models import AbstractUser
from django.db import models

class user (AbstractUser):
        avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True,
        help_text=" Photo de profil facultative"
    )

def __str__(self):
        return self.username