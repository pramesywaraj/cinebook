import { z } from "zod/v3";

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'To loong')
});

export const registerSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password is too long')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;