from django.contrib import admin
from .models import Show , City

admin.site.register(Show)

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
