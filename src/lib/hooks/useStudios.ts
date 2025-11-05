import { useMemo, useState } from 'react';

import type { Studio } from '@/lib/schemas/studio';

import useDebounce from './useDebounce';

export default function useStudios(data: Studio[]) {
    const [query, setQuery] = useState('');
    const debounced = useDebounce(query, 300);

    const items = useMemo(() => {
        const q = debounced.trim().toLowerCase();
        if (!q) return data;

        return data.filter((studio) => studio.name.toLowerCase().includes(q));
    }, [data, debounced]);

    return { items, query, setQuery };
}
