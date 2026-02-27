from django.urls import path
from .views import (
    seat_availability,
    lock_seats,
    confirm_booking,
    booking_history,
    cancel_booking
)

urlpatterns = [
    path("seats/<int:show_id>/",seat_availability),
    path("lock/",lock_seats),
    path("confirm/",confirm_booking),
    path("history/",booking_history),
    path("cancel/",cancel_booking),
]