from rest_framework import serializers
from .models import *

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster', 'language', 'rating', 'genre']


class MoviePersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoviePerson
        fields = "__all__"


class MovieDetailSerializer(serializers.ModelSerializer):
    people = MoviePersonSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = "__all__"


