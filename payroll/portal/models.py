from django.db import models

class PayRoll(models.Model):
    PayFishPortalId = models.IntegerField()
    PersRef = models.IntegerField()
    PersCode = models.CharField(max_length=8)
    IssueYear = models.SmallIntegerField()
    IssueMonth = models.SmallIntegerField()
    IYearMonth = models.IntegerField()
    FishName = models.CharField(max_length= 50)
    FishImage = models.BinaryField()

    class Meta:
        managed = False
        db_table = 'dbo.payroll'
