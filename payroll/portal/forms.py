from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile



class UserRegisterForm(UserCreationForm):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'first_name', 'last_name']


class ProfileForm(forms.ModelForm):

    class Meta:
        model = Profile
        fields = ['phone_number', 'description']


class PasswordResetRequestForm(forms.Form):
    personnel_code = forms.CharField(max_length=8, required=True)


class PasswordResetConfirmForm(forms.Form):
    verification_code = forms.CharField(max_length=6, required=True)
    new_password = forms.CharField(widget=forms.PasswordInput, required=True)

