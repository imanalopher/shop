from django.shortcuts import render
from .models import *


def index(request):
    products = Product.objects.all()[:10]
    categories = Category.objects.filter(active=True, parent__isnull=True)
    return render(request, 'product/index.html', {'products': products, 'categories': categories})


def category(request, id):
    categories = Category.objects.filter(active=True, parent__isnull=True)
    products = Product.objects.filter(category_id=id)
    return render(request, 'product/category.html', {'products': products, 'categories': categories})
