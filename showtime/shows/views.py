from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Show

from rest_framework.generics import ListAPIView
from .models import City
from .serializers import CitySerializer



@api_view(['GET'])
@permission_classes([AllowAny])
def shows_by_movie(request, movie_id):
    city = request.GET.get('city')

    shows = Show.objects.filter(
        movie_id=movie_id,
        is_active=True
    )

    if city:
        shows = shows.filter(theatre__city__iexact=city)

    data = {}

    for show in shows:
        theatre_name = show.theatre.name

        if theatre_name not in data:
            data[theatre_name] = []

        data[theatre_name].append({
            'show_id': show.id,
            'time': show.show_time,
            'price': show.price
        })

    return Response(data)


class CityListView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [AllowAny]