from rest_framework import serializers
from .models import user
from .models import task
from .models import comments



class userserializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=["id","username","password","is_superuser"]

class taskserializer(serializers.ModelSerializer):
    class Meta:
        model=task
        fields=["id","task_name","task_description","task_status","task_start","task_end","task_members"]   

class  commentserializer(serializers.ModelSerializer):
    class Meta:
        model=comments
        fields=["id","comments","task_id","user_id","user_name"]           