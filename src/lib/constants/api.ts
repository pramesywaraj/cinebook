export const API_ENDPOINT = {
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGIN: '/auth/login',
    CINEMA_STUDIOS: '/cinema/studios',
    CINEMA_STUDIOS_SEATS: (id: number) => `/cinema/studios/${id}/seats`,

    BOOKING_ONLINE: '/booking/online',
    BOOKING_OFFLINE: '/booking/offline',
    BOOKING_HISTORY: '/booking/my-bookings',
};
