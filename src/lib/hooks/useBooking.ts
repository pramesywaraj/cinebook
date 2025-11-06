import { useEffect, useMemo, useState, useCallback } from 'react';

import type { Booking, BookingPayload } from '@/lib/schemas/booking';
import { bookOnline, fetchBookings } from '@/lib/api/booking';

export function useBookings(userId: number) {
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
