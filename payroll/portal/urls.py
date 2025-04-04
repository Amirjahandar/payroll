from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import *


urlpatterns = [
    path('', index, name='index'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('payroll/<int:year>/<int:month>/', payroll, name='payroll'),
    path('password-reset/', request_password_reset, name='password_reset_request'),
    path('password-reset/confirm/', confirm_password_reset, name='password_reset_confirm'),
]