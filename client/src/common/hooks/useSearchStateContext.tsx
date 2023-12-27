import { useContext } from 'react';
import { SearchStateContext } from '../contexts';
import { UseSearchStateResult } from '../hooks/useSearchState';

/**
 * Custom hook that provides access to the search state context.
 *
 * @throws {Error} If the hook is used outside of a SearchStateContextProvider.
 * @returns {UseSearchStateResult} The search state context.
 */
export default function useSearchStateContext(): UseSearchStateResult {
    const searchStateContext = useContext(SearchStateContext);
    if (!searchStateContext) {
        throw new Error('useSearchStateContext must be used within a SearchStateContextProvider');
    }
    return searchStateContext;
}
