from django.urls import path
from . import views

urlpatterns=[
    path('login/',views.Loginview,name="login"),
    path('register/',views.Registerview,name="register"),
    path('userlist/',views.userlist,name="userlist"),
    path('addtask/',views.addtask,name="addtask"),
    path('addtask/<int:pk>',views.taskdetails,name='taskdetails'),
    path('usertask/',views.usertask,name='usertask'),
    path('userfilterlist/',views.userfilterlist,name='userfilterlist'),
    path('postcomments',views.postcomments,name='postcomments'),
    path('commentfilter/',views.commentfilter,name='commentfilter'),

]