import { forwardRef, useImperativeHandle, useState } from 'react';
import type { Booking } from '@/lib/schemas/booking';
import { fetchStudioSeats } from '@/lib/api/studio';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

export type BookingSuccessDialogHandle = {
    open: (booking: Booking) => void;
    close: () => void;
};

interface Props {
    onCreateAnother?: () => void;
}

const BookingSuccessDialog = forwardRef<BookingSuccessDialogHandle, Props>(
    ({ onCreateAnother }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [booking, setBooking] = useState<Booking | null>(null);
        const [seatNumbers, setSeatNumbers] = useState<string[]>([]);
        const [loadingSeats, setLoadingSeats] = useState(false);

        const setOpen = (next: boolean) => {
            setIsOpen(next);
            if (!next) {
                setBooking(null);
                setSeatNumbers([]);
            }
        };

        useImperativeHandle(ref, () => ({
            open: (bookingData: Booking) => {
                setBooking(bookingData);
                setOpen(true);
                // Fetch seat numbers
                if (bookingData.studio_id) {
                    setLoadingSeats(true);
                    fetchStudioSeats(bookingData.studio_id)
                        .then((seats) => {
                            const seatMap = new Map(
                                seats.map((seat) => [seat.id, seat.seat_number])
                            );
                            const numbers = bookingData.seat_ids
                                .map((id) => seatMap.get(id))
                                .filter(
                                    (num): num is string => num !== undefined
                                );
                            setSeatNumbers(numbers);
                        })
                        .catch((err) => {
                            console.error('Failed to fetch seats:', err);
                        })
                        .finally(() => {
                            setLoadingSeats(false);
                        });
                }
            },
            close: () => setOpen(false),
        }));

        const handleCreateAnother = () => {
            setOpen(false);
            onCreateAnother?.();
        };

        return (
            <Dialog open={isOpen} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Booking Created Successfully!</DialogTitle>
                        <DialogDescription>
                            The booking has been created and is ready for use.
                        </DialogDescription>
                    </DialogHeader>

                    {booking && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Booking Code
                                    </p>
                                    <p className="text-sm font-medium">
                                        {booking.booking_code}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Customer
                                    </p>
                                    <p className="text-sm font-medium">
                                        {booking.user_name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {booking.user_email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Studio
                                    </p>
                                    <p className="text-sm font-medium">
                                        Studio {booking.studio_id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Seats ({booking.seat_ids.length})
                                    </p>
                                    <p className="text-sm font-medium">
                                        {loadingSeats
                                            ? 'Loading...'
                                            : seatNumbers.length > 0
                                              ? seatNumbers.join(', ')
                                              : booking.seat_ids.join(', ')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center border rounded-lg p-4 bg-muted/30">
                                <img
                                    src={booking.qr_code}
                                    alt="Booking QR code"
                                    className="h-32 w-32 object-contain"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="secondary"
                            onClick={handleCreateAnother}
                            className="w-full sm:w-auto"
                        >
                            Create Another
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
);

BookingSuccessDialog.displayName = 'BookingSuccessDialog';

export default BookingSuccessDialog;
