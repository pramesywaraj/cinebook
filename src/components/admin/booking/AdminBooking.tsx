import { useState, useRef, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSeats } from '@/lib/hooks/useSeats';
import { useBookingOffline } from '@/lib/hooks/useBooking';
import useStudios from '@/lib/hooks/useStudios';
import {
    BookingOfflineSchema,
    type BookingOfflinePayload,
} from '@/lib/schemas/booking';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    Field,
    FieldLabel,
    FieldError,
    FieldContent,
} from '@/components/ui/Field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';
import Seat from '@/components/app/seats/Seat';
import BookingSuccessDialog, {
    type BookingSuccessDialogHandle,
} from './BookingSuccessDialog';

export default function AdminBooking() {
    const { items: studios, loading: studiosLoading } = useStudios();
    const [selectedStudioId, setSelectedStudioId] = useState<number | null>(
        null
    );
    const successDialogRef = useRef<BookingSuccessDialogHandle>(null);

    const {
        seats,
        rows,
        loading: seatsLoading,
        studioName,
        selectedSeats,
        selectedSeatNumbers,
        totalSelected,
        error: seatsError,
        onSelectSeat,
        onClearSelection,
    } = useSeats(selectedStudioId || 0);

    const {
        isLoading: isBookingLoading,
        error: bookingError,
        createBooking,
        reset: resetBooking,
    } = useBookingOffline();

    const form = useForm<BookingOfflinePayload>({
        resolver: zodResolver(BookingOfflineSchema),
        defaultValues: {
            studioId: 0,
            seatIds: [],
            customerName: '',
            customerEmail: '',
        },
        mode: 'onChange',
    });

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

    const onSubmit = async (data: BookingOfflinePayload) => {
        if (!selectedStudioId || totalSelected === 0) {
            return;
        }

        try {
            const seatIds = Array.from(selectedSeats.keys());

            const response = await createBooking({
                studioId: selectedStudioId,
                seatIds,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
            });

            successDialogRef.current?.open(response.booking);

            // Reset form and selections
            form.reset();
            onClearSelection();
            setSelectedStudioId(null);
            resetBooking();
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    const handleStudioChange = (value: string) => {
        const studioId = value ? Number(value) : null;
        setSelectedStudioId(studioId);
        onClearSelection();
        if (studioId) {
            form.setValue('studioId', studioId);
        }
        form.setValue('seatIds', []);
    };

    const handleCreateAnother = () => {
        // Dialog is already closed, form is already reset
        // Just ensure state is clean
        setSelectedStudioId(null);
        onClearSelection();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Cashier Booking</h2>
                <p className="text-muted-foreground">
                    Create offline bookings for customers
                </p>
            </div>

            {/* Studio Selection */}
            <div>
                <Field>
                    <FieldLabel>Select Studio</FieldLabel>
                    <FieldContent>
                        <Select
                            value={selectedStudioId?.toString() || ''}
                            onValueChange={(value) => handleStudioChange(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a studio..." />
                            </SelectTrigger>
                            <SelectContent>
                                {studios.map((studio) => (
                                    <SelectItem
                                        key={studio.id}
                                        value={studio.id.toString()}
                                    >
                                        {studio.name} ({studio.total_seats}{' '}
                                        seats)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FieldContent>
                </Field>
            </div>

            {/* Seat Selection */}
            {selectedStudioId && (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Select Seats for {studioName}
                        </h3>
                        {seatsLoading ? (
                            <p className="text-sm text-muted-foreground">
                                Loading seats...
                            </p>
                        ) : seatsError ? (
                            <p className="text-sm text-destructive">
                                {seatsError}
                            </p>
                        ) : (
                            <div className="space-y-3 w-full">
                                {rows.map(({ row, items }) => (
                                    <div
                                        key={row}
                                        className="flex items-center justify-center gap-4"
                                    >
                                        <div className="grid grid-flow-col auto-cols-max gap-2">
                                            {items.map((s) => (
                                                <Seat
                                                    key={s.id}
                                                    label={s.seat_number}
                                                    available={s.is_available}
                                                    selected={selectedSeats.has(
                                                        s.id
                                                    )}
                                                    onSelect={() =>
                                                        onSelectSeat(s)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-6">
                                    <div className="mx-auto h-2 w-full rounded bg-muted" />
                                    <p className="mt-2 text-center text-xs text-muted-foreground">
                                        Screen
                                    </p>
                                </div>

                                {/* Legend */}
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    {legend.map((l) => (
                                        <div
                                            key={l.label}
                                            className="flex items-center gap-2"
                                        >
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
                        )}

                        {totalSelected > 0 && (
                            <div className="mt-4 p-3 bg-muted rounded-md">
                                <p className="text-sm font-medium">
                                    Selected:{' '}
                                    {selectedSeatNumbers
                                        .map((s) => s.seat_number)
                                        .join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Customer Information Form */}
            {selectedStudioId && totalSelected > 0 && (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="text-lg font-semibold">
                            Customer Information
                        </h3>

                        <Field>
                            <FieldLabel>Customer Name</FieldLabel>
                            <FieldContent>
                                <Controller
                                    name="customerName"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter customer name"
                                            aria-invalid={
                                                !!form.formState.errors
                                                    .customerName
                                            }
                                        />
                                    )}
                                />
                                <FieldError
                                    errors={[
                                        form.formState.errors.customerName,
                                    ]}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>Customer Email</FieldLabel>
                            <FieldContent>
                                <Controller
                                    name="customerEmail"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="customer@example.com"
                                            aria-invalid={
                                                !!form.formState.errors
                                                    .customerEmail
                                            }
                                        />
                                    )}
                                />
                                <FieldError
                                    errors={[
                                        form.formState.errors.customerEmail,
                                    ]}
                                />
                            </FieldContent>
                        </Field>
                    </div>

                    {bookingError && (
                        <p className="text-sm text-destructive">
                            {bookingError}
                        </p>
                    )}

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                onClearSelection();
                                form.reset();
                            }}
                            disabled={isBookingLoading}
                        >
                            Clear
                        </Button>
                        <Button
                            type="submit"
                            disabled={isBookingLoading}
                            isLoading={isBookingLoading}
                            className="flex-1"
                        >
                            Create Booking ({totalSelected} seats)
                        </Button>
                    </div>
                </form>
            )}

            <BookingSuccessDialog
                ref={successDialogRef}
                onCreateAnother={handleCreateAnother}
            />
        </div>
    );
}
