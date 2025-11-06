import { z } from 'zod/v3';

export const BookingTypeEnum = z.enum(['online', 'offline']);
export const BookingStatusEnum = z.enum(['active', 'used']);

export const BookingSchema = z.object({
    id: z.number().int().positive(),
    booking_code: z.string().uuid(),
    user_id: z.number().int().positive(),
    user_name: z.string().min(1),
    user_email: z.string().email(),
    studio_id: z.number().int().positive(),
    seat_ids: z.array(z.number().int().positive()).nonempty(),
    qr_code: z
        .string()
        .regex(
            /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/,
            'Invalid image data URL'
        ),
    booking_type: BookingTypeEnum,
    status: BookingStatusEnum,
    created_at: z.string().datetime(),
});

export const BookingListSchema = z.array(BookingSchema);

export const BookingOnlineSchema = z.object({
    studioId: z.number().int().positive(),
    seatIds: z.number().int().positive().array(),
});

export type Booking = z.infer<typeof BookingSchema>;
export type BookingType = z.infer<typeof BookingTypeEnum>;
export type BookingStatus = z.infer<typeof BookingStatusEnum>;

export type BookingPayload = z.infer<typeof BookingOnlineSchema>;
