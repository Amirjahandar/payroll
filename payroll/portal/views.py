from django.shortcuts import render
from django.contrib.auth import authenticate, login as dj_login
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PayRoll



@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user:
            dj_login(request, user)
            return render(request, 'index.html')
        
        msg="نام کاربری یا رمز عبور اشتباه است!"
        return render(request, 'login.html', {"msg":msg})

    return render(request, 'login.html')


def index(request):
    return render(request, 'index.html')


def signup(request):
    pass

