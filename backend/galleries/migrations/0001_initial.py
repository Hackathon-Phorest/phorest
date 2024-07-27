# Generated by Django 5.0.7 on 2024-07-27 18:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('backgrounds', '0001_initial'),
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='gallery/')),
                ('title', models.CharField(max_length=100)),
                ('upload_date', models.DateField(auto_now_add=True)),
                ('is_personal_background', models.BooleanField(default=False)),
                ('personal_background', models.ImageField(blank=True, null=True, upload_to='personal_background/')),
                ('private', models.BooleanField(default=False)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='galleries', to='categories.category')),
                ('common_background', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backgrounds.background')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='galleries', to='categories.categorytype')),
            ],
        ),
    ]
