import { type Studio } from '@/lib/schemas/studio';

export default function StudioItem({ studio }: { studio: Studio }) {
    return (
        <div className="flex items-center justify-between rounded-md border border-border bg-card p-4">
            <div className="space-y-1">
                <h3 className="text-base font-semibold">{studio.name}</h3>
                <p className="text-xs text-muted-foreground">
                    {studio.total_seats} seats
                </p>
            </div>
            <a
                href={`/studio/${studio.id}`}
                className="text-sm text-primary hover:underline"
            >
                View
            </a>
        </div>
    );
}
