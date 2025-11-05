import { apiFetchParsed } from '@/lib/api/client';
import { StudioListSchema, type Studio } from '@/lib/schemas/studio';
import { API_ENDPOINT } from '../constants/api';

export async function fetchStudios(signal?: AbortSignal): Promise<Studio[]> {
    return apiFetchParsed(API_ENDPOINT.CINEMA_STUDIOS, StudioListSchema, {
        signal,
    });
}
