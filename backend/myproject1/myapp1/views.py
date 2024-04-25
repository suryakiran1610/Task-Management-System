from django.shortcuts import render
from .models import user
from .models import task
from .models import comments
from .serializers import userserializer
from .serializers import taskserializer
from .serializers import commentserializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404



@api_view(['POST'])
def Registerview(request):
    serializer=userserializer(data=request.data)
    if serializer.is_valid():
        username=serializer.validated_data.get('username')
        password=serializer.validated_data.get('password')
        userdata=user.objects.create_user(username=username,password=password)
        user_auth=authenticate(username=username,password=password)
        if user_auth:
            refresh=RefreshToken.for_user(user_auth)
            return Response({'token':str(refresh.access_token)})
        else:
            return Response({'error':"Falid to Authenticate"})
    else:
        return Response(serializer.errors)    
    
@api_view(['POST'])
def Loginview(request):
    username=request.data['username']
    password=request.data['password']
    user=authenticate(username=username,password=password)
    if user:
        refresh=RefreshToken.for_user(user)
        refresh.payload["superuser"]=user.is_superuser
        refresh.payload["username"] = user.username 
        return Response({"token":str(refresh.access_token)})
    else:
        return Response({"error":"Invalid Credentials"})
    
    
@api_view(['GET'])
def userlist(request):
    users=user.objects.filter(is_superuser=False)
    serializer=userserializer(users,many=True)
    return Response(serializer.data)    



@api_view(['GET','POST'])
def addtask(request):
    if request.method=="GET":
        task1=task.objects.all()
        serializer=taskserializer(task1,many=True)
        return Response(serializer.data)
    
    elif request.method=="POST":
        serializer=taskserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET','PATCH','DELETE'])
def taskdetails(request,pk):
    tasks=get_object_or_404(task,id=pk)

    if request.method=="GET":
        serializer=taskserializer(tasks)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer = taskserializer(tasks, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        tasks.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
def usertask(request):
    if request.method == "GET":
        user_id = request.query_params.get('user_id')
        if user_id:
            tasks = task.objects.filter(task_members=user_id)
            serializer = taskserializer(tasks, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "User ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET'])
def userfilterlist(request):
    user_ids = request.query_params.get('user_id')
    if user_ids:
        user_ids_list = [int(id) for id in user_ids.split(',')]  
        users = user.objects.filter(id__in=user_ids_list) 
        serializer = userserializer(users, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "No user IDs provided"})
    

@api_view(['POST'])
def postcomments(request):
    serializer=commentserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)   
    return Response(serializer.error) 


@api_view(['GET'])
def commentfilter(request):
    task_id = request.query_params.get('task_id')
    if task_id:
        comments_for_task = comments.objects.filter(task_id=task_id)
        serializer = commentserializer(comments_for_task, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "No task ID provided"})
