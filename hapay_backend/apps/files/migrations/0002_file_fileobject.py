# Generated by Django 3.0.7 on 2020-06-05 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='fileobject',
            field=models.FileField(default=0, upload_to=''),
            preserve_default=False,
        ),
    ]
