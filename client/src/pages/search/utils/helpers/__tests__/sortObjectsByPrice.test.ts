import { sortObjectsByPrice } from '../sortObjectsByPrice';

describe('sortObjectsByPrice', () => {
    it('should sort objects by price in ascending order', () => {
        const items = [
            { id: 1, price: '100' },
            { id: 2, price: '50' },
            { id: 3, price: '200' },
        ];

        const sortedItems = sortObjectsByPrice(items, 'price', 'ascending');

        expect(sortedItems).toEqual([
            { id: 2, price: '50' },
            { id: 1, price: '100' },
            { id: 3, price: '200' },
        ]);
    });

    it('should sort objects by price in descending order', () => {
        const items = [
            { id: 1, price: '100' },
            { id: 2, price: '50' },
            { id: 3, price: '200' },
        ];

        const sortedItems = sortObjectsByPrice(items, 'price', 'descending');

        expect(sortedItems).toEqual([
            { id: 3, price: '200' },
            { id: 1, price: '100' },
            { id: 2, price: '50' },
        ]);
    });
});