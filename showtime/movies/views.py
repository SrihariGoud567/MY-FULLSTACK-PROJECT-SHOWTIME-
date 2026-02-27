from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Movie
from .serializers import MovieListSerializer, MovieDetailSerializer

from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdminRole
from rest_framework import status
from .permissions import IsAdminRole




@api_view(['GET'])
@permission_classes([AllowAny])
def movie_list(request):
    city = request.GET.get('city')

    movies = Movie.objects.filter(is_active=True)

    if city:
        movies = movies.filter(
            shows__theatre__city__iexact=city,
            shows__is_active=True
        ).distinct()

    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_detail(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id, is_active=True)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)

    serializer = MovieDetailSerializer(movie)
    return Response(serializer.data)


#Create Movie Api
@api_view(['POST'])
@permission_classes([IsAdminRole])
def create_movie(request):
    serializer = MovieDetailSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#UPDATE MOVIE API
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminRole])
def update_movie(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)

    serializer = MovieDetailSerializer(movie, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

#DELETE MOVIE API

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminRole])
def delete_movie(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)

    movie.delete()
    return Response({'message': 'Movie deleted successfully'})

