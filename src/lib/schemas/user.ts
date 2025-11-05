import { z } from 'zod/v3';

export const UserRoleEnum = z.enum(['customer', 'admin']);

export const UserSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    name: z.string().min(2).max(50),
    role: UserRoleEnum,
});

export type User = z.infer<typeof UserSchema>;
