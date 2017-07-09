# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-08 09:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_auto_20170708_0931'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='children',
            field=models.ManyToManyField(blank=True, related_name='_category_children_+', to='product.Category'),
        ),
    ]
