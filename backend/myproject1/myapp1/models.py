from django.db import models
from django.contrib.auth.models import AbstractUser


class user(AbstractUser):
    pass

class task(models.Model):
    task_name=models.CharField(max_length=200)
    task_description=models.CharField(max_length=400)
    task_status=models.CharField(max_length=20)
    task_start=models.DateField()
    task_end=models.DateField()
    task_members=models.ManyToManyField(user)
    

class comments(models.Model):
    comments=models.CharField(max_length=100, null=True,blank=True)
    task_id=models.IntegerField(null=True,blank=True)
    user_id=models.IntegerField(null=True,blank=True)  
    user_name=models.CharField(max_length=100,null=True,blank=True)  