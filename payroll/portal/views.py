from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login as dj_login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from PIL import Image
import io
import base64
from .forms import UserRegisterForm, ProfileForm
from .models import PayRoll


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            dj_login(request, user)
            next = request.POST.get('next') or '/'
            return redirect(next)
        
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




@login_required(login_url='/login')
def index(request):
    firstname = request.user.first_name
    lastname = request.user.last_name
    context = {'firstname':str(firstname), 'lastname':str(lastname)}
    print(context)
    return render(request, 'index.html', context)





@login_required(login_url='/login')
def payroll(request, year, month):
    user = request.user.username
    pers_code = user.zfill(8)
    print(pers_code, year, month)

    try:
        fish_portal = PayRoll.objects.get(perscode=pers_code, issueyear=year, issuemonth=month)
        image_data = fish_portal.fishimage

        # convert data to image 
        image = Image.open(io.BytesIO(image_data))
        image = image.convert("RGB")
        buffered = io.BytesIO()
        # send image to front 
        image.save(buffered, "PNG")
        image_base64 = base64.b64encode(buffered.getvalue()).decode()
        return  JsonResponse({'image_base64':image_base64})

    except PayRoll.DoesNotExist:
        return HttpResponse("Record not found", status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)




