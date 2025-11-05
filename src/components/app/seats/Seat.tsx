import { cn } from '@/lib/utils';

export default function Seat({
    label,
    available,
    selected,
    onSelect,
}: {
    label: string;
    available: boolean;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            disabled={!available}
            onClick={onSelect}
            aria-pressed={selected}
            className={cn(
                'h-9 w-9 rounded-md text-xs font-medium border transition-colors',
                available
                    ? 'bg-background hover:bg-accent'
                    : 'bg-muted/40 text-muted-foreground cursor-not-allowed',
                selected &&
                    'bg-primary text-primary-foreground border-primary hover:text-primary'
            )}
            title={label}
        >
            {label}
        </button>
    );
}
