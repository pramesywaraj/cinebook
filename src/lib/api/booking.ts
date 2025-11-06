import {
    BookingListSchema,
    type Booking,
    type BookingPayload,
} from '@/lib/schemas/booking';
import { API_ENDPOINT } from '@/lib/constants/api';

import { apiFetch, apiFetchParsed } from './client';

interface BookingOnlineResponse {
    booking: Booking;
}

export async function bookOnline(
    payload: BookingPayload,
    signal?: AbortSignal
) {
    return apiFetch<BookingOnlineResponse>(API_ENDPOINT.BOOKING_ONLINE, {
        method: 'POST',
        body: JSON.stringify({
            studioId: payload.studioId,
            seatIds: payload.seatIds,
        }),
        signal,
    });
}

export async function fetchBookings(signal?: AbortSignal): Promise<Booking[]> {
    return apiFetchParsed(API_ENDPOINT.BOOKING_HISTORY, BookingListSchema, {
        signal,
    });
}
