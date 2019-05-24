from django.contrib import admin
from .models import Profile

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('user', 'phone_number', 'fatherName',)



admin.site.register(Profile, ProfileAdmin)

