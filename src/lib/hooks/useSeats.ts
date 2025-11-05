import { useEffect, useState, useMemo } from 'react';
import { type Seat } from '@/lib/schemas/seat';

import { MOCK_SEATS } from '../__mock__/seats';

const ROW_SIZE = 5;

export function useSeats() {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const totalSelected = selected.size;

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setSeats(MOCK_SEATS);
            setLoading(false);
        }, 1500);
    }, []);

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

    const onSelectSeat = (id: number, available: boolean) => {
        if (!available) return;

        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else {
                next.add(id);
            }

            return next;
        });
    };

    return {
        seats,
        rows,
        selected,
        totalSelected,
        loading,
        error: err,
        onSelectSeat,
    };
}
