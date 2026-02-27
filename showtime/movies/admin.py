

from django.contrib import admin
from .models import *

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'rating', 'is_active')
    list_filter = ('language', 'is_active')
    search_fields = ('title',)

admin.site.register(MoviePerson)