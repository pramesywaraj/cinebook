import { type Studio } from '@/lib/schemas/studio';
import StudioItem from './StudioItem';

export default function StudioList({ items }: { items: Studio[] }) {
    if (!items.length) {
        return (
            <div className="text-sm text-muted-foreground">
                No studios found.
            </div>
        );
    }
    return (
        <div className="space-y-3">
            {items.map((s) => (
                <StudioItem key={s.id} studio={s} />
            ))}
        </div>
    );
}
