# Generated by Django 5.0.7 on 2024-08-01 20:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('galleries', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Winner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.PositiveIntegerField()),
                ('win_date', models.DateField()),
                ('weekly_like', models.PositiveIntegerField(blank=True, null=True)),
                ('gallery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='winners', to='galleries.gallery')),
            ],
        ),
    ]
