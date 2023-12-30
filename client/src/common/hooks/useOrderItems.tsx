import { useSearchParams } from 'react-router-dom';

type ReturnTypeIf<T, U> = U extends T ? U : undefined;

/**
 * A hook which is responsible for ordering array of items based on a search parameter called 'orderId'.
 * @template T - The type of the items.
 * @template U - The type of the items or undefined.
 * @param {Array<{ id: string; method: (items: T[]) => T[] }>} orderBy - An array of objects which contains an ID and a method to order the items.
 * @returns {<U extends T[] | undefined>(items: U) => ReturnTypeIf<T[], U>} - A function which accepts an array of items and returns the ordered items based on the provided order ID method if it exists, otherwise, it returns the ordered items based on the first order ID method.
 * @example
 * const orderBy = [
 *    { id: '1', method: (items: number[]) => items.slice().sort((a, b) => a - b) },
 *   { id: '2', method: (items: number[]) => items.slice().sort((a, b) => b - a) },
 * ];
 *
 * const orderItems = useOrderItems(orderBy);
 *
 * const items = [2, 1, 3];
 * const orderedItems1 = orderItems(items); // [1, 2, 3]
 * const orderedItems2 = orderItems(items); // [3, 2, 1]
 */
export default function useOrderItems<T>(
    orderBy: { id: string; method: (items: T[]) => T[] }[]
): <U extends T[] | undefined>(items: U) => ReturnTypeIf<T[], U> {
    const [searchParams] = useSearchParams();

    const orderItems = <U extends T[] | undefined>(items: U): ReturnTypeIf<T[], U> => {
        if (!items) return undefined as ReturnTypeIf<T[], U>;
        const idToOrderBy = searchParams.get('orderId') as string;

        for (const { id, method } of orderBy) {
            if (id !== idToOrderBy) continue;
            else return method(items as T[]) as ReturnTypeIf<T[], U>;
        }

        return orderBy[0].method(items as T[]) as ReturnTypeIf<T[], U>;
    };

    return orderItems;
}
