from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
   
class User(AbstractUser):
    email = models.EmailField(unique=True)

    REQUIRED_FIELDS = []  # Remove 'email' from REQUIRED_FIELDS
    
    def __str__(self):
        return self.email


class BMIRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    height = models.FloatField()
    weight = models.FloatField()
    mobile = models.CharField(max_length=15)
    date = models.DateField(auto_now_add=True)
    bmi = models.FloatField()
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.date}"
