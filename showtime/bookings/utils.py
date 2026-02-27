from django.utils import timezone
from django.conf import settings
from .models import SeatBooking

def release_expired_seats():
    expiry_time = timezone.now() - settings.SEAT_LOCK_DURATION

    expired_seats = SeatBooking.objects.filter(
        status='LOCKED',
        locked_at__lt=expiry_time
    )

    expired_seats.delete()
