import { useCallback } from 'react';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';

import type { Booking } from '@/lib/schemas/booking';
import { formatUtc } from '@/lib/date';

import { StatusBadge, TypeBadge } from './BookingBadge';
import { Button } from '@/components/ui/Button';

interface Props {
    booking: Booking;
}

export default function BookingItem({ booking }: Props) {
    const goDetail = useCallback(() => {
        window.location.assign(`/booking/${booking.id}`);
    }, [booking.id]);

    return (
        <Card className="hover:bg-accent/30 transition-colors gap-4 py-4">
            <CardHeader className="flex justify-between px-4">
                <div className="flex items-center gap-2">
                    <StatusBadge status={booking.status} />
                    <TypeBadge type={booking.booking_type} />
                </div>
                <span className="text-xs text-muted-foreground">
                    {formatUtc(booking.created_at, 'DD MMM YYYY, HH:mm')}
                </span>
            </CardHeader>
            <CardContent className="px-4">
                <div className="flex items-center gap-2">
                    <div className="flex-3">
                        <p className="text-sm font-medium">
                            {`Booking #${booking.id}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {`Code: ${booking.booking_code}`}
                        </p>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="text-sm">{`Studio ${booking.studio_id}`}</p>
                        <p className="text-xs text-muted-foreground">
                            {`Seats: ${booking.seat_ids.length}`}
                        </p>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="px-4 justify-center">
                <Button variant="ghost" onClick={goDetail}>
                    View Detail
                </Button>
            </CardFooter>
        </Card>
    );
}
