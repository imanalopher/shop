from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='product.index'),
    url(r'^product/(?P<id>[0-9]+)$', views.productShow, name='product.show'),
    url(r'^category/(?P<id>[0-9]+)$', views.category, name='category.getById'),
]