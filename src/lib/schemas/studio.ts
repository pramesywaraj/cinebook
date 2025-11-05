import { z } from 'zod';

export const StudioSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    total_seats: z.number().int().nonnegative(),
});

export const StudioListSchema = z.array(StudioSchema);
export type Studio = z.infer<typeof StudioSchema>;
