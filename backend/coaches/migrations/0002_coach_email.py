# Generated by Django 3.1.6 on 2021-02-07 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coaches', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='coach',
            name='email',
            field=models.EmailField(default='test@email.com', max_length=254),
        ),
    ]
