import { useBookings } from '@/lib/hooks/useBooking';

import BookingItem from './BookingItem';

export default function BookingList({ userId }: { userId: number }) {
    const { bookings, isLoading, error } = useBookings(userId);

    if (isLoading)
        return (
            <p className="text-sm text-muted-foreground">Loading bookings…</p>
        );
    if (error) return <p className="text-sm text-destructive">{error}</p>;
    if (bookings.length === 0 && !isLoading)
        return (
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
        );

    return (
        <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
            ))}
        </div>
    );
}
