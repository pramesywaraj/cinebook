import type { Booking } from '@/lib/schemas/booking';
import { formatUtc } from '@/lib/date';

import { StatusBadge, TypeBadge } from './BookingBadge';

interface Props {
    booking: Booking;
}

export default function BookingDetail({ booking }: Props) {
    return (
        <div className="space-y-4">
            <section className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <StatusBadge status={booking.status} />
                        <TypeBadge type={booking.booking_type} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {formatUtc(booking.created_at)}
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm font-medium">Booking Code</p>
                        <p className="text-xs text-muted-foreground">
                            {booking.booking_code}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Studio</p>
                        <p className="text-xs text-muted-foreground">
                            Studio {booking.studio_id}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Seats</p>
                        <p className="text-xs text-muted-foreground">
                            {booking.seat_ids.join(', ')}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">User</p>
                        <p className="text-xs text-muted-foreground">
                            {booking.user_name} • {booking.user_email}
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-lg border p-4 space-y-3">
                <p className="text-sm font-medium">QR Code</p>
                <div className="flex items-center justify-center">
                    <img
                        src={booking.qr_code}
                        alt="Booking QR code"
                        className="h-48 w-48 object-contain border rounded"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <a
                        href={booking.qr_code}
                        download={`booking-${booking.id}-qr.png`}
                        className="text-sm underline"
                    >
                        Download QR
                    </a>
                </div>
            </section>
        </div>
    );
}
