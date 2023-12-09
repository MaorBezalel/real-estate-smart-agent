import { unformatPrice } from './unformatPrice';

/**
 * Sorts in place an array of objects by price property.
 * @template T - The type of the objects in the array.
 * @template K - The key of the price property in the objects.
 * @param {T[]} items - The array of objects to be sorted.
 * @param {K} priceKey - The key of the price property in the objects.
 * @param {'ascending' | 'descending'} order - The sort order (ascending or descending).
 * @returns {T[]} The reference to the sorted array.
 */
export const sortObjectsByPrice = <
    T extends Record<K, string | number>,
    K extends keyof T,
>(
    items: T[],
    priceKey: K,
    order: 'ascending' | 'descending'
): T[] => {
    return items.sort((a, b) => {
        const priceA: number = unformatPrice(a[priceKey].toString());
        const priceB: number = unformatPrice(b[priceKey].toString());

        switch (order) {
            case 'ascending': return priceA - priceB;
            case 'descending': return priceB - priceA;
        }
    });
};
