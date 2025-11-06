import {
    BookingListSchema,
    type Booking,
    type BookingPayload,
    type BookingOfflinePayload,
} from '@/lib/schemas/booking';
import { API_ENDPOINT } from '@/lib/constants/api';

import { apiFetch, apiFetchParsed } from './client';

interface BookingResponse {
    booking: Booking;
}

export async function bookOnline(
    payload: BookingPayload,
    signal?: AbortSignal
) {
    return apiFetch<BookingResponse>(API_ENDPOINT.BOOKING_ONLINE, {
        method: 'POST',
        body: JSON.stringify({
            studioId: payload.studioId,
            seatIds: payload.seatIds,
        }),
        signal,
    });
}

export async function bookOffline(
    payload: BookingOfflinePayload,
    signal?: AbortSignal
) {
    return apiFetch<BookingResponse>(API_ENDPOINT.BOOKING_OFFLINE, {
        method: 'POST',
        body: JSON.stringify({
            studioId: payload.studioId,
            seatIds: payload.seatIds,
            customerName: payload.customerName,
            customerEmail: payload.customerEmail,
        }),
        signal,
    });
}
export async function fetchBookings(signal?: AbortSignal): Promise<Booking[]> {
    return apiFetchParsed(API_ENDPOINT.BOOKING_HISTORY, BookingListSchema, {
        signal,
    });
}
