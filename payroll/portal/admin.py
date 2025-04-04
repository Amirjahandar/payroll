from django.contrib import admin
from .models import PayRoll, Profile


@admin.register(PayRoll)
class PayRollAdmin(admin.ModelAdmin):
    list_display = ['payfishportalid', 'persref', 'perscode', 'issueyear', 'issuemonth', 'iyearmonth', 'fishname']
    sortable_by = ['issueyear', 'issuemonth']
    search_fields = ['perscode']
    readonly_fields = ['fishimage']



@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone_number', 'description']
    search_fields = ['phone_number']
    readonly_fields = ['user']