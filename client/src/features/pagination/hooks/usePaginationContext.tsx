import { useContext } from 'react';
import PaginationContext, { PaginationContextType } from '../contexts/PaginationContext';

export default function usePaginationContext(): PaginationContextType {
    const paginationContext = useContext(PaginationContext);

    if (!paginationContext) {
        throw new Error('usePaginationContext must be used within a PaginationContext.Provider');
    }

    return paginationContext;
}
