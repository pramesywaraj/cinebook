import { useEffect, useState, useMemo } from 'react';
import { SeatListSchema, type Seat } from '@/lib/schemas/seat';

import { apiFetchParsed } from '../api/client';
import { API_ENDPOINT } from '../constants/api';

const ROW_SIZE = 5;

interface SelectedSeat {
    id: number;
    seat_number: string;
}

export function useSeats(studioId: number) {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const [selected, setSelected] = useState<Map<number, SelectedSeat>>(
        new Map()
    );

    const totalSelected = selected.size;
    const selectedSeatNumbers = Array.from(selected.values());

    useEffect(() => {
        if (!studioId) {
            setErr('Studio ID is required');
            setLoading(false);
            return;
        }

        setLoading(true);
        setErr(null);

        const controller = new AbortController();

        apiFetchParsed(
            API_ENDPOINT.CINEMA_STUDIOS_SEATS(studioId),
            SeatListSchema,
            { signal: controller.signal }
        )
            .then((data) => {
                setSeats(data);
                setLoading(false);
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch seats:', error);
                    setErr(error.message || 'Failed to load seats');
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [studioId]);

    // Group seats by seat number row divided by ROW_SIZE
    const rows = useMemo(() => {
        const getNum = (s: string) => parseInt(s.replace(/^\D+/, ''), 10) || 0;

        // sort seats by numeric tail ascending
        const sorted = [...seats].sort(
            (a, b) => getNum(a.seat_number) - getNum(b.seat_number)
        );

        const chunks: { row: string; items: Seat[] }[] = [];

        // assign seat number into it's row
        for (let i = 0; i < sorted.length; i += ROW_SIZE) {
            const slice = sorted.slice(i, i + ROW_SIZE);
            if (!slice.length) continue;

            const start = slice[0].seat_number;
            const end = slice[slice.length - 1].seat_number;
            const row = `${start} - ${end}`;

            chunks.push({ row, items: slice });
        }

        return chunks;
    }, [seats]);

    const onSelectSeat = (seat: Seat) => {
        if (!seat.is_available) return;

        setSelected((prev) => {
            const next = new Map(prev);
            if (next.has(seat.id)) next.delete(seat.id);
            else
                next.set(seat.id, {
                    id: seat.id,
                    seat_number: seat.seat_number,
                });

            return next;
        });
    };

    const onClearSelection = () => {
        setSelected(new Map());
    };

    return {
        seats,
        rows,
        selectedSeats: selected,
        selectedSeatNumbers,
        totalSelected,
        studioName: seats.length > 0 ? seats[0].studio_name : '-',
        loading,
        error: err,
        onSelectSeat,
        onClearSelection,
    };
}
