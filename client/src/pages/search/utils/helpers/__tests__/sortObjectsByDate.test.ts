import { sortObjectsByDate } from '../sortObjectsByDate';

describe('sortObjectsByDate', () => {
    it('should sort objects by date in descending order', () => {
        const items = [
            { id: 1, date: '2022-01-01' },
            { id: 2, date: '2022-02-01' },
            { id: 3, date: '2022-03-01' },
        ];

        const sortedItems = sortObjectsByDate(items, 'date');

        expect(sortedItems).toEqual([
            { id: 3, date: '2022-03-01' },
            { id: 2, date: '2022-02-01' },
            { id: 1, date: '2022-01-01' },
        ]);
    });

    // Add more test cases if needed
});