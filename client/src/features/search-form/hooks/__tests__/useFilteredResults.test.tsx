import { renderHook, waitFor } from '@testing-library/react';
import useFilteredResults from '../useFilteredResults';

describe('useFilteredResults()', () => {
    const items = ['apple', 'banana', 'car', 'cherry', 'chocolate', 'date'];
    const limit = 3;
    const delay = 500;
    const timeout = delay + 100;

    it('should return filtered results based on the query', async () => {
        // Arrange 1
        let query = 'a';

        // Act 1
        const { result, rerender } = renderHook(() => useFilteredResults(items, query, limit, delay));
        const filteredResults = result.current;

        // Assert 1
        expect(filteredResults).toEqual(['apple']);

        // --------------

        // Arrange 2
        query = 'ch';

        // Act 2
        rerender({ items, query, limit, delay });

        // Assert 2
        await waitFor(() => expect(result.current).toEqual(['cherry', 'chocolate']), { timeout });

        // --------------

        // Arrange 3
        query = 'c';

        // Act 3
        rerender({ items, query, limit, delay });

        // Assert 3
        await waitFor(() => expect(result.current).toEqual(['car', 'cherry', 'chocolate']), { timeout });
    });

    it('should return an empty array if the query is empty', () => {
        // Arrange
        const emptyQuery = '';

        // Act
        const { result } = renderHook(() => useFilteredResults(items, emptyQuery, limit, delay));
        const filteredResults = result.current;

        // Assert
        expect(filteredResults).toEqual([]);
    });

    it('should return an empty array if there are no matches', () => {
        // Arrange
        const noMatchesQuery = 'xyz';

        // Act
        const { result } = renderHook(() => useFilteredResults(items, noMatchesQuery, limit, delay));
        const filteredResults = result.current;

        // Assert
        expect(filteredResults).toEqual([]);
    });
});
