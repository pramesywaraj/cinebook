import { useEffect, useMemo, useState } from 'react';

import type { Booking } from '@/lib/schemas/booking';

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
