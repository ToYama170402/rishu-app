# Generated by Django 4.2.16 on 2024-11-05 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_courseregistrationstatus_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseregistrationstatus',
            name='fifth_choice',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='courseregistrationstatus',
            name='first_choice',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='courseregistrationstatus',
            name='fourth_choice',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='courseregistrationstatus',
            name='primary',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='courseregistrationstatus',
            name='second_choice',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='courseregistrationstatus',
            name='third_choice',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]