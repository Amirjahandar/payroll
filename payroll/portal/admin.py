from django.contrib import admin
from .models import PayRoll


@admin.register(PayRoll)
class PayRollAdmin(admin.ModelAdmin):
    list_display = ['payfishportalid', 'persref', 'perscode', 'issueyear', 'issuemonth', 'iyearmonth', 'fishname']
    sortable_by = ['issueyear', 'issuemonth']
    search_fields = ['perscode']
    readonly_fields = ['fishimage']
