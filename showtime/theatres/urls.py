from django.urls import path
from .views import city_list

urlpatterns = [
    path('cities/', city_list),
]
