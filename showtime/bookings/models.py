from django.db import models
from django.conf import settings
from shows.models import Show
from theatres.models import Seat

User = settings.AUTH_USER_MODEL

from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class SeatBooking(models.Model):
    STATUS_CHOICES = (
        ('AVAILABLE', 'Available'),
        ('LOCKED', 'Locked'),
        ('BOOKED', 'Booked'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    show = models.ForeignKey('shows.Show', on_delete=models.CASCADE)
    seat = models.ForeignKey('theatres.Seat', on_delete=models.CASCADE)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='AVAILABLE'
    )

    locked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('show', 'seat')

    def __str__(self):
        return f"{self.show} - {self.seat} - {self.status}"



import uuid
from django.db import models
from django.conf import settings
from shows.models import Show

User = settings.AUTH_USER_MODEL

class Booking(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
    ]

    booking_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.booking_id)

