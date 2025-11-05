import { Badge } from '@/components/ui/Badge';
import type { BookingType, BookingStatus } from '@/lib/schemas/booking';

export function StatusBadge({ status }: { status: BookingStatus }) {
    const cls =
        status === 'active'
            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
            : 'bg-muted text-muted-foreground border-transparent';
    return <Badge className={cls}>{status}</Badge>;
}

export function TypeBadge({ type }: { type: BookingType }) {
    const cls =
        type === 'online'
            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
            : 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    return <Badge className={cls}>{type}</Badge>;
}
