# Generated by Django 4.2.3 on 2023-07-05 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bmi', '0003_alter_user_managers_bmirecord_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bmirecord',
            name='mobile',
            field=models.CharField(max_length=15),
        ),
    ]
