from django.db import models

class Theatre(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    address = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.city}"



class Screen(models.Model):
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE, related_name='screens')
    name = models.CharField(max_length=50)  # Screen 1, Screen 2
    total_seats = models.IntegerField()

    def __str__(self):
        return f"{self.theatre.name} - {self.name}"


class Seat(models.Model):
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)  # A1, A2, B1
    row = models.CharField(max_length=5)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.screen.name} - {self.seat_number}"


