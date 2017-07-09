from django.db import models
from datetime import datetime
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class Category(models.Model):
    name = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    parent = models.ForeignKey('self', blank=True, null=True, related_name='children')

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=11, decimal_places=5)
    description = models.CharField(max_length=4040)
    photo = models.ImageField(upload_to='uploads')
    photo_small = ImageSpecField(source='photo', processors=[ResizeToFill(86, 86)], format='JPEG', options={'quality': 80})
    photo_100 = ImageSpecField(source='photo', processors=[ResizeToFill(100, 90)], format='JPEG', options={'quality': 80})
    photo_square = ImageSpecField(source='photo', processors=[ResizeToFill(270, 270)], format='JPEG', options={'quality': 80})
    photo_big = ImageSpecField(source='photo', processors=[ResizeToFill(540, 540)], format='JPEG', options={'quality': 80})
    photo_middle = ImageSpecField(source='photo', processors=[ResizeToFill(220, 200)], format='JPEG', options={'quality': 80})
    amount = models.SmallIntegerField()
    lastUpdate = models.DateTimeField(auto_now=True, default=datetime.now(), null=False),
    reviews = models.IntegerField(default=0)
    rating = models.SmallIntegerField(default=0)
    code = models.CharField(max_length=100)

    def __str__(self):
        return str(self.pk) + ' - ' + self.name + ' - ' + str(self.price)