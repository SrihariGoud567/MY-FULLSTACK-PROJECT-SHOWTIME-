from django.db import models
from movies.models import Movie
from theatres.models import Theatre, Screen

class Show(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='shows')
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    show_time = models.DateTimeField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.movie.title} - {self.theatre.name} - {self.show_time}"

#CITIES MODEL

class City(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

