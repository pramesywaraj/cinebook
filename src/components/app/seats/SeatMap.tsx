import { useMemo, useRef } from 'react';
import { useSeats } from '@/lib/hooks/useSeats';

import { Button } from '@/components/ui/Button';

import BookConfirmationDialog, {
    type BookConfirmationDialogHandle,
} from '@/components/app/dialog/BookConfirmationDialog';

import Seat from './Seat';

interface Props {
    studioId: number;
}

export default function SeatMap({ studioId }: Props) {
    const {
        seats,
        rows,
        loading,
        studioName,
        selectedSeats,
        selectedSeatNumbers,
        totalSelected,
        error,
        onSelectSeat,
        onClearSelection,
    } = useSeats(studioId);
    const confirmDialogRef = useRef<BookConfirmationDialogHandle>(null);

    const legend = useMemo(
        () => [
            { label: 'Available', cls: 'bg-background border' },
            {
                label: 'Selected',
                cls: 'bg-primary text-primary-foreground border-primary',
            },
            { label: 'Unavailable', cls: 'bg-muted/40' },
        ],
        []
    );

    const onBookSeats = () => {
        const selectedIds = selectedSeats.keys();
    };

    if (loading)
        return <p className="text-sm text-muted-foreground">Loading seats…</p>;
    if (error) return <p className="text-sm text-destructive">{error}</p>;

    return (
        <div className="flex-1 flex flex-col">
            <div className="space-y-1 mb-2">
                <h2>{`Select your seats for ${studioName}`}</h2>
                <p>{`Total Capacity: ${seats.length || 0} seats`}</p>
            </div>
            <div className="flex-1 flex flex-col gap-4 justify-center">
                <div className="flex items-start gap-2">
                    <p className="text-sm text-muted-foreground">Selected:</p>
                    <p className="text-sm text-muted-foreground font-semibold">
                        {selectedSeatNumbers
                            .map((s) => s.seat_number)
                            .join(', ') || '-'}
                    </p>
                </div>

                <div className="space-y-3 w-full">
                    {rows.map(({ row, items }) => (
                        <div
                            key={row}
                            className="flex items-center justify-center gap-4"
                        >
                            <div className="text-xs text-muted-foreground text-right flex-1">
                                {row}
                            </div>
                            <div className="grid grid-flow-col auto-cols-max gap-2 flex-3">
                                {items.map((s) => (
                                    <Seat
                                        key={s.id}
                                        label={s.seat_number}
                                        available={s.is_available}
                                        selected={selectedSeats.has(s.id)}
                                        onSelect={() => onSelectSeat(s)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <div className="mx-auto h-2 w-full rounded bg-muted" />
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        Screen
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                    {legend.map((l) => (
                        <div key={l.label} className="flex items-center gap-2">
                            <div
                                className={`h-4 w-4 rounded border ${l.cls}`}
                            />
                            <span className="text-xs text-muted-foreground">
                                {l.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Button
                    type="button"
                    variant="secondary"
                    disabled={totalSelected === 0 || !!error}
                    onClick={onClearSelection}
                >
                    Clear Selection
                </Button>

                <Button
                    type="button"
                    disabled={totalSelected === 0 || !!error}
                    onClick={() => confirmDialogRef?.current?.open()}
                >
                    Confirm Seats ({totalSelected})
                </Button>
            </div>

            <BookConfirmationDialog
                ref={confirmDialogRef}
                onConfirm={onBookSeats}
            />
        </div>
    );
}
