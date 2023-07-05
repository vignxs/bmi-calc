from django.contrib import admin
from .models import *

class BMIRecordAdmin(admin.ModelAdmin):
    list_display = ("user",'name' ,'gender', 'age', 'height', "weight" , 'mobile','date', 'bmi','category')
    list_filter = ('date',)

class UserAdmin(admin.ModelAdmin):
    list_display = ("id",'username' ,'email', 'last_login', 'date_joined',)
    list_filter = ('last_login',)

    
admin.site.site_header = "BMI Tracker" 
admin.site.register(BMIRecord, BMIRecordAdmin)
admin.site.register(User, UserAdmin)