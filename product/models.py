from django.db import models
from datetime import datetime


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=11, decimal_places=5)
    description = models.CharField(max_length=4040)
    photo = models.CharField(max_length=1000)
    amount = models.SmallIntegerField()
    lastUpdate = models.DateTimeField(auto_now=True, default=datetime.now(), null=False),
    reviews = models.IntegerField(default=0)
    rating = models.SmallIntegerField(default=0)
    code = models.CharField(max_length=100)
