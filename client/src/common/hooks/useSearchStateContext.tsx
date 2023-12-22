import { useContext } from 'react';
import { SearchStateContext } from '../contexts';

export default function useSearchStateContext() {
    const searchStateContext = useContext(SearchStateContext);
    if (!searchStateContext) {
        throw new Error('useSearchStateContext must be used within a SearchStateContextProvider');
    }
    return searchStateContext;
}
