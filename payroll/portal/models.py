from django.db import models
from django.contrib.auth.models import User

class PayRoll(models.Model):
    payfishportalid = models.IntegerField(db_column='PayFishPortalId', primary_key=True)
    persref = models.IntegerField(db_column='PersRef')
    perscode = models.CharField(db_column='PersCode', max_length=20)
    issueyear = models.SmallIntegerField(db_column='IssueYear')
    issuemonth = models.SmallIntegerField(db_column='IssueMonth')
    iyearmonth = models.IntegerField(db_column='IYearMonth')
    fishname = models.CharField(db_column='FishName', max_length=20)
    fishimage = models.BinaryField(db_column='FishImage')
    class Meta:
        managed = False
        db_table = 'payroll'

    def __str__(self):
        return f"{self.perscode}_{self.issueyear}_{self.issuemonth}"



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=11, blank=False, null=False)
    company_position = models.CharField(max_length=100, blank=True, null=True)