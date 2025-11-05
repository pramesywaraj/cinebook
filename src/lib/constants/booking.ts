import {
    BookingStatusEnum,
    BookingTypeEnum,
    type BookingStatus,
    type BookingType,
} from '../schemas/booking';

export const BOOKING_STATUS_MAP: { [x in BookingStatus]: string } = {
    [BookingStatusEnum.Enum.active]: 'Upcoming',
    [BookingStatusEnum.Enum.used]: 'Completed',
};

export const BOOKING_TYPE_MAP: { [x in BookingType]: string } = {
    [BookingTypeEnum.Enum.online]: 'E-Ticket',
    [BookingTypeEnum.Enum.offline]: 'Box Office',
};
