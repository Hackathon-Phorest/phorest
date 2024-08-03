# Generated by Django 5.0.7 on 2024-08-02 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hashtag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='gallery',
            name='hashtags',
            field=models.ManyToManyField(blank=True, null=True, to='galleries.hashtag'),
        ),
    ]