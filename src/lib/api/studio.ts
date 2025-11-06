import { apiFetchParsed } from '@/lib/api/client';
import { StudioListSchema, type Studio } from '@/lib/schemas/studio';
import { SeatListSchema, type Seat } from '@/lib/schemas/seat';
import { API_ENDPOINT } from '../constants/api';

export async function fetchStudios(signal?: AbortSignal): Promise<Studio[]> {
    return apiFetchParsed(API_ENDPOINT.CINEMA_STUDIOS, StudioListSchema, {
        signal,
    });
}

export async function fetchStudio(
    id: number,
    signal?: AbortSignal
): Promise<Studio> {
    const studios = await apiFetchParsed(
        API_ENDPOINT.CINEMA_STUDIOS,
        StudioListSchema,
        { signal }
    );
    const studio = studios.find((studio) => studio.id === id);

    if (!studio) {
        throw new Error(`Studio with id ${id} not found`);
    }

    return studio;
}

export async function fetchStudioSeats(
    studioId: number,
    signal?: AbortSignal
): Promise<Seat[]> {
    return apiFetchParsed(
        API_ENDPOINT.CINEMA_STUDIOS_SEATS(studioId),
        SeatListSchema,
        { signal }
    );
}
