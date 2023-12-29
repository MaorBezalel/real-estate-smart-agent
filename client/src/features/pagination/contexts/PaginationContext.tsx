import { createContext } from 'react';

export type PaginationContextType = {
    currentPage: number;
    totalPages: number;
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export default PaginationContext;
