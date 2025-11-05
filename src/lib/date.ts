import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function formatUtc(input: string | Date, format = 'MMM D, YYYY HH:mm') {
    const d = typeof input === 'string' ? dayjs.utc(input) : dayjs(input);
    return d.local().format(format);
}
