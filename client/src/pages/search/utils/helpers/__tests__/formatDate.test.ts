import { formatDate } from '..';

describe('formatDate', () => {
    it('should format the date correctly', () => {
        const date = new Date('2022-01-01T12:34:56');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('01/01/22 12:34:56');
    });

    it('should handle single-digit day, month, hour, minute, and second', () => {
        const date = new Date('2022-02-03T04:05:06');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('03/02/22 04:05:06');
    });

    it('should handle two-digit day, month, hour, minute, and second', () => {
        const date = new Date('2022-12-31T23:59:59');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('31/12/22 23:59:59');
    });
});