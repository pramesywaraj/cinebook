import { z } from 'zod/v3';
import { PUBLIC_API_BASE_URL } from 'astro:env/client';

const BASE_URL = PUBLIC_API_BASE_URL;

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
    init?: RequestInit & { signal?: AbortSignal }
): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {}),
        },
        ...init,
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
    init?: RequestInit & { signal?: AbortSignal }
) {
    const data = await apiFetch<unknown>(path, init);
    return schema.parse(data);
}
