from django.urls import path
from .views import shows_by_movie , CityListView

urlpatterns = [
    path('movie/<int:movie_id>/', shows_by_movie),
    path("cities/", CityListView.as_view()),

]
