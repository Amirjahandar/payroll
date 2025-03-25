from django.shortcuts import render
from django.http import HttpResponse


def login(request, pers_code):
    
    return render(request, 'login.html')


def index(request):
    return render(request, 'index.html')

