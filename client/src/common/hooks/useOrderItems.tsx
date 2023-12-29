import { useSearchParams } from 'react-router-dom';

type ReturnTypeIf<T, U> = U extends T ? U : undefined;

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
