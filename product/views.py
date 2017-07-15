from django.shortcuts import render, get_object_or_404
from .models import *


def index(request):
    products = Product.objects.order_by('-id')[:10]
    categories = Category.objects.filter(active=True, parent__isnull=True)
    return render(request, 'product/index.html', {'products': products, 'categories': categories})


def category(request, id):
    categories = Category.objects.filter(active=True, parent__isnull=True)
    products = Product.objects.filter(category_id=id).order_by('-id')
    return render(request, 'product/category.html', {'products': products, 'categories': categories})


def productShow(request, id):
    product = get_object_or_404(Product, pk=id)
    categories = Category.objects.filter(active=True, parent__isnull=True)
    return render(request, 'product/productShow.html', {'product': product, 'categories': categories})