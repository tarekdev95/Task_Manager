from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # add extra fields if needed
    avatar = models.URLField(blank=True, null=True)
    def __str__(self): return self.username