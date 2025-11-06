import useStudios from '@/lib/hooks/useStudios';
import { useAuth } from '@/lib/hooks/useAuth';

import StudioSearch from './StudioSearch';
import StudioList from './StudioList';

export default function StudioBrowser() {
    const { query, setQuery, items, loading, error } = useStudios();
    const { user } = useAuth();

    if (loading) {
        return <div className="text-center py-4">Loading studios...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-4 text-red-500">
                Error loading studios
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{`Hello, ${user?.name || 'Guest'} 👋`}</h1>
                <p>Browse your favorite studio and book your seats now!</p>
            </div>
            <div className="space-y-4">
                <StudioSearch value={query} onChange={setQuery} />
                <StudioList items={items} />
            </div>
        </>
    );
}
