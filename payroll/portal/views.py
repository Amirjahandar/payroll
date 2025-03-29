from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login as dj_login
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PayRoll
from .forms import UserRegisterForm, ProfileForm


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



def signup(request):
    if request.method == 'POST':
        user_form = UserRegisterForm(request.POST)
        profile_form = ProfileForm(request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            profile = profile_form.save(commit=False)
            profile.user = user  # اتصال پروفایل به کاربر
            profile.save()
            messages.success(request, "ثبت‌نام با موفقیت انجام شد!")
            return redirect('login')
        else:
            print(user_form.errors)
            print(profile_form.errors)
            msg="اطلاعات کاربری اشتباه می باشد!"
            return render(request, 'signup.html', {'msg':msg})
    
    return render(request, 'signup.html')






def index(request):
    return render(request, 'index.html')




