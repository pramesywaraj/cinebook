import { useEffect, useMemo, useState } from 'react';

import { fetchStudios } from '@/lib/api/studio';
import type { Studio } from '@/lib/schemas/studio';

import useDebounce from './useDebounce';

export default function useStudios() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [query, setQuery] = useState('');
    const debounced = useDebounce(query, 300);

    useEffect(() => {
        fetchStudios()
            .then((data) => {
                setStudios(data);
                setError(null);
            })
            .catch((err) => {
                setError(err);
                setStudios([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const items = useMemo(() => {
        const q = debounced.trim().toLowerCase();
        if (!q) return studios;

        return studios.filter((studio) =>
            studio.name.toLowerCase().includes(q)
        );
    }, [studios, debounced]);

    return { items, query, setQuery, loading, error };
}
