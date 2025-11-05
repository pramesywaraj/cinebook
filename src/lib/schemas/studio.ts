import { z } from 'zod/v3';

export const StudioSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    total_seats: z.number().int().nonnegative(),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(),
});

export const StudioListSchema = z.array(StudioSchema);
export type Studio = z.infer<typeof StudioSchema>;
