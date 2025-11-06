import { useEffect, useMemo, useState, useCallback } from 'react';

import type {
    Booking,
    BookingOfflinePayload,
    BookingPayload,
} from '@/lib/schemas/booking';
import { bookOffline, bookOnline, fetchBookings } from '@/lib/api/booking';
import { fetchStudioSeats } from '@/lib/api/studio';

export function useBookings() {
    const [items, setItems] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setErr(null);

        const controller = new AbortController();

        fetchBookings(controller.signal)
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch bookings:', error);
                    setErr(error.message || 'Failed to load bookings');
                    setIsLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    const sorted = useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            ),
        [items]
    );

    return {
        bookings: sorted,
        isLoading,
        error: err,
    };
}

export function useBookingOnline() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createBooking = useCallback(async (payload: BookingPayload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await bookOnline(payload);
            return response.booking;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Failed to create booking';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
    }, []);

    return {
        isLoading: loading,
        error,
        createBooking,
        reset,
    };
}

export function useBookingOffline() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createBooking = useCallback(
        async (payload: BookingOfflinePayload) => {
            setLoading(true);
            setError(null);

            try {
                const response = await bookOffline(payload);
                return response;
            } catch (err) {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'Failed to create booking';
                setError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const reset = useCallback(() => {
        setError(null);
    }, []);

    return {
        isLoading: loading,
        error,
        createBooking,
        reset,
    };
}

export function useBookingDetail(bookingId: number) {
    const [booking, setBooking] = useState<Booking | null>(null);
    const [seatNumbers, setSeatNumbers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookingId || isNaN(bookingId)) {
            setError('Invalid booking ID');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const controller = new AbortController();

        fetchBookings(controller.signal)
            .then((bookings) => {
                const found = bookings.find((b) => b.id === bookingId);
                if (!found) {
                    setError('Booking not found');
                    setIsLoading(false);
                    return;
                }

                setBooking(found);

                // Fetch seats for the studio to get seat numbers
                return fetchStudioSeats(
                    found.studio_id,
                    controller.signal
                ).then((seats) => {
                    // Create a map of seat ID to seat number
                    const seatMap = new Map(
                        seats.map((seat) => [seat.id, seat.seat_number])
                    );

                    // Map booking seat_ids to seat_numbers
                    const numbers = found.seat_ids
                        .map((id) => seatMap.get(id))
                        .filter((num): num is string => num !== undefined);

                    setSeatNumbers(numbers);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    console.error('Failed to fetch booking:', err);
                    setError(err.message || 'Failed to load booking');
                    setIsLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [bookingId]);

    return {
        booking,
        seatNumbers,
        isLoading,
        error,
    };
}
