import { useEffect, useMemo, useState, useCallback } from 'react';

import type { Booking, BookingPayload } from '@/lib/schemas/booking';
import { bookOnline } from '@/lib/api/booking';

import { MOCK_BOOKINGS } from '@/lib/__mock__/booking';

export function useBookings(userId: number) {
    const [items, setItems] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setErr(null);

        const t = setTimeout(() => {
            try {
                const data = MOCK_BOOKINGS.filter((b) => b.user_id === userId);
                setItems(data);
            } catch (e) {
                setErr('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        }, 700);

        return () => clearTimeout(t);
    }, [userId]);

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
        loading,
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
