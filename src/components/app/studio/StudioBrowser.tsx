import StudioSearch from './StudioSearch';
import StudioList from './StudioList';
import useStudios from '@/lib/hooks/useStudios';

export default function StudioBrowser() {
    const { query, setQuery, items, loading, error } = useStudios();

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
        <div className="space-y-4">
            <StudioSearch value={query} onChange={setQuery} />
            <StudioList items={items} />
        </div>
    );
}
