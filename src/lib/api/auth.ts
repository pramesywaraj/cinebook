import { apiFetch } from './client';

import type { User } from '@/lib/schemas/user';
import type { RegisterFormData, LoginFormData } from '@/lib/schemas/auth';
import { API_ENDPOINT } from '@/lib/constants/api';

interface AuthResponse {
    user: User;
    token: string;
}

export async function registerUser(
    payload: RegisterFormData,
    signal?: AbortSignal
) {
    return apiFetch<AuthResponse>(API_ENDPOINT.AUTH_REGISTER, {
        method: 'POST',
        body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            password: payload.password,
        }),
        signal,
    });
}

export async function loginUser(payload: LoginFormData, signal?: AbortSignal) {
    return apiFetch<AuthResponse>(API_ENDPOINT.AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
        }),
        signal,
    });
}
