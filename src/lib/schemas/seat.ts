import { z } from 'zod/v3';
import { StudioSchema } from './studio';

export const SeatSchema = z.object({
    id: z.number().int().positive(),
    studio_id: z.number().int().positive(),
    seat_number: z.string(),
    is_available: z.boolean(),
    studio: StudioSchema,
    studio_name: z.string(),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(),
});

export const SeatListSchema = z.array(SeatSchema);
export type Seat = z.infer<typeof SeatSchema>;
