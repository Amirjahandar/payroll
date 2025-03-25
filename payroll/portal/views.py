from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from .models import PayRoll

def get_image(request, perscode):
    image_obj = get_object_or_404(PayRoll, PersCode=str(perscode))
    if image_obj.FishImage:
        return HttpResponse(image_obj.FishImage, content_type="image/jpeg") 
    else:
        return HttpResponse(status=404)

def login(request):

    return render(request, 'login.html')


def index(request):
    return render(request, 'index.html')

