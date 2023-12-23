import { useMemo } from 'react';
import { useDebounce } from '.';

import { getTopMatches } from '../helpers';

/**
 * A hook that filters a list of items by a query.
 *
 * @param {readonly string[]} items - The list of items to filter.
 * @param {string} query - The query to filter the items by.
 * @param {number} [limit=5] - The maximum number of items to return. Default is 5.
 * @param {number} [delay=500] - The delay in milliseconds to debounce the query. Default is 500.
 * @returns {readonly string[]} The filtered items.
 */
export default function useFilteredResults(
    items: readonly string[],
    query: string,
    limit: number = 5,
    delay: number = 500
): readonly string[] {
    const debouncedQuery = useDebounce<string>(query, delay);

    const filteredResults = useMemo(() => {
        if (!debouncedQuery) return [];
        return getTopMatches(items, debouncedQuery, limit);
    }, [debouncedQuery]);

    return filteredResults;
}
