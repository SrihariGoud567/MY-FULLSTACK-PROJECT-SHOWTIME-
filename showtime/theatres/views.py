from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Theatre

@api_view(['GET'])
def city_list(request):
    cities = Theatre.objects.values_list('city', flat=True).distinct()
    return Response(list(cities))
