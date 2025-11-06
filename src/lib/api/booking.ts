import type { Booking, BookingPayload } from '@/lib/schemas/booking';
import { API_ENDPOINT } from '@/lib/constants/api';

import { apiFetch } from './client';

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
