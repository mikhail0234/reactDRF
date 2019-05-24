from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,11}$',
                                 message="Phone number must be entered in the format: '+7 999 999 99 99'. Up to 11 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)  # validators should be a list
    fatherName = models.TextField(max_length=20, blank=False)
