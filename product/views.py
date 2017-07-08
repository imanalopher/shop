from django.shortcuts import render
from .models import *


def index(request):
    products = Product.objects.all()[:10]
    return render(request, 'product/index.html', {'products': products})
