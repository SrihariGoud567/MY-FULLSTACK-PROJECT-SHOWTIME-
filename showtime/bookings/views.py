from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import SeatBooking
from shows.models import Show
from theatres.models import Seat
from .utils import release_expired_seats



#SEAT AVAILABLE API

@api_view(['GET'])
@permission_classes([AllowAny])
def seat_availability(request, show_id):
     # Release expired locks first
    release_expired_seats()

    show = Show.objects.get(id=show_id)
    show = Show.objects.get(id=show_id)
    seats = Seat.objects.filter(screen=show.screen, is_active=True)

    booked_seats = SeatBooking.objects.filter(
        show=show,
        status='BOOKED'
    ).values_list('seat_id', flat=True)

    locked_seats = SeatBooking.objects.filter(
        show=show,
        status='LOCKED'
    ).values_list('seat_id', flat=True)

    data = []
    for seat in seats:
        data.append({
            'seat_id': seat.id,
            'seat_number': seat.seat_number,
            'row': seat.row,
            'status': (
                'BOOKED' if seat.id in booked_seats else
                'LOCKED' if seat.id in locked_seats else
                'AVAILABLE'
            )
        })

    return Response(data)


#SEAT LOCKED API

from rest_framework.permissions import IsAuthenticated
from django.db import transaction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def lock_seats(request):
    show_id = request.data.get('show_id')
    seat_ids = request.data.get('seat_ids')
    user = request.user

    with transaction.atomic():
        for seat_id in seat_ids:
            SeatBooking.objects.create(
                user=user,
                show_id=show_id,
                seat_id=seat_id,
                status='LOCKED'
            )

    return Response({'message': 'Seats locked successfully'})


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import SeatBooking


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_booking(request):
    show_id = request.data.get('show_id')
    user = request.user
    release_expired_seats()

    # 1️⃣ Find locked seats for this user & show
    locked_seats = SeatBooking.objects.filter(
        show_id=show_id,
        user=user,
        status='LOCKED'
    )

    if not locked_seats.exists():
        return Response(
            {"error": "No locked seats found"},
            status=400
        )

    # 2️⃣ Confirm booking
    total_amount = locked_seats.count() * 250  # example price

    locked_seats.update(
        status='BOOKED'
    )

    # 3️⃣ Return confirmation
    return Response({
        "message": "Your show is confirmed",
        "booking_id": f"BK-{timezone.now().strftime('%Y%m%d%H%M%S')}",
        "total_amount": f"₹{total_amount}"
    })



#API FOR BOOKINGS HISTORY

from rest_framework.permissions import IsAuthenticated
from .models import Booking, SeatBooking

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def booking_history(request):
    user = request.user

    bookings = Booking.objects.filter(user=user).order_by('-created_at')

    response_data = []

    for booking in bookings:
        seats = SeatBooking.objects.filter(
            booking=booking,
            status='BOOKED'
        )

        seat_numbers = [seat.seat.seat_number for seat in seats]

        response_data.append({
            'booking_id': booking.booking_id,
            'movie': booking.show.movie.title,
            'theatre': booking.show.theatre.name,
            'show_time': booking.show.show_time,
            'seats': seat_numbers,
            'total_amount': booking.total_amount,
            'status': booking.status,
            'booked_on': booking.created_at
        })

    return Response(response_data)


#CANCELLATION API

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_booking(request):
    user = request.user
    booking_id = request.data.get('booking_id')

    try:
        booking = Booking.objects.get(
            booking_id=booking_id,
            user=user
        )
    except Booking.DoesNotExist:
        return Response(
            {'error': 'Booking not found'},
            status=404
        )

    if booking.status != 'CONFIRMED':
        return Response(
            {'error': 'Booking cannot be cancelled'},
            status=400
        )

    with transaction.atomic():
        # Update booking status
        booking.status = 'CANCELLED'
        booking.save()

        # Delete seat bookings to free seats
        SeatBooking.objects.filter(
            booking=booking
        ).delete()

    return Response({
        'message': 'Booking cancelled successfully'
    })
