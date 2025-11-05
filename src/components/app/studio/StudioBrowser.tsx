import { type Studio } from '@/lib/schemas/studio';
import StudioSearch from './StudioSearch';
import StudioList from './StudioList';
import useStudios from '@/lib/hooks/useStudios';

type Props = {
    data?: Studio[];
};

export default function StudioBrowser({ data = [] }: Props) {
    const { query, setQuery, items } = useStudios(data);

    return (
        <div className="space-y-4">
            <StudioSearch value={query} onChange={setQuery} />
            <StudioList items={items} />
        </div>
    );
}
