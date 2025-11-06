import {
    BookingListSchema,
    type Booking,
    type BookingPayload,
    type BookingOfflinePayload,
    type ValidationResponse,
    ValidationResponseSchema,
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

export async function validateBooking(
    bookingCode: string,
    signal?: AbortSignal
): Promise<ValidationResponse> {
    return apiFetchParsed(
        API_ENDPOINT.BOOKING_VALIDATE,
        ValidationResponseSchema,
        {
            method: 'POST',
            body: JSON.stringify({ bookingCode }),
            signal,
        }
    );
}
