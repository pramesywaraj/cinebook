import { z } from 'zod/v3';
import { PUBLIC_API_BASE_URL } from 'astro:env/client';

const BASE_URL = PUBLIC_API_BASE_URL;
const TOKEN_KEY = 'auth_token';

// Helper function to get auth token from localStorage
function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export interface ApiFetchOptions extends RequestInit {
    signal?: AbortSignal;
    skipAuth?: boolean; // Skip including auth token
}

export class ApiError extends Error {
    status: number;
    details?: unknown;
    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export async function apiFetch<T>(
    path: string,
    init?: ApiFetchOptions
): Promise<T> {
    const { skipAuth = false, ...fetchInit } = init || {};

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...((fetchInit.headers as Record<string, string>) || {}),
    };

    if (!skipAuth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        ...fetchInit,
        headers,
    });

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await res.json().catch(() => ({})) : await res.text();

    if (!res.ok) {
        const message =
            (isJson && body?.message) || res.statusText || 'Request failed';
        throw new ApiError(message, res.status, body);
    }

    return (body as T) ?? ({} as T);
}

// Optional: schema-safe parser for responses
export async function apiFetchParsed<T>(
    path: string,
    schema: z.ZodSchema<T>,
    init?: ApiFetchOptions
) {
    const data = await apiFetch<unknown>(path, init);
    return schema.parse(data);
}
