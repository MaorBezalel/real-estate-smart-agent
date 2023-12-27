/**
 * Sorts in place an array of objects in descending order by a date property.
 * @template T - The type of the objects in the array.
 * @template K - The type of the date property key.
 * @param {T[]} items - The array of objects to be sorted.
 * @param {K} dateKey - The key of the date property to sort by.
 * @returns {T[]} - reference to the sorted array.
 */
export const sortObjectsByDate = <
    T extends Record<K, string | number | Date>,
    K extends keyof T,
>(
    items: T[],
    dateKey: K
): T[] => {
    return items.sort((a, b) => {
        const dateA: Date = new Date(a[dateKey]);
        const dateB: Date = new Date(b[dateKey]);

        return dateB.getTime() - dateA.getTime();
    });
};
