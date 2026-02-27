from django.db import models

from django.db import models

class Movie(models.Model):
    LANGUAGE_CHOICES = [
        ('ENG', 'English'),
        ('HIN', 'Hindi'),
        ('TEL', 'Telugu'),
        ('TAM', 'Tamil'),
        ('MAL', 'Malayalam'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in minutes")
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES)
    genre = models.CharField(max_length=100)
    release_date = models.DateField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    poster = models.ImageField(upload_to='movies/')
    banner = models.ImageField(upload_to='movies/' , null=True , blank=True)
    is_active = models.BooleanField(default=True)  # Now Showing
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class MoviePerson(models.Model):
    ROLE_TYPES = (
        ("CAST", "Cast"),
        ("CREW", "Crew"),
    )

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="people")
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)   # Actor, Director, etc
    photo = models.ImageField(upload_to="cast/")
    type = models.CharField(max_length=10, choices=ROLE_TYPES)

    def __str__(self):
        return f"{self.name} - {self.role}"
