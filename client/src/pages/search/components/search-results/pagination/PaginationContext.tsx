import { createContext } from 'react';
import { UseMutationResult } from '@tanstack/react-query';

export type PaginationContextType = {
    currentPage: number;
    totalPages: number;
    mutation: UseMutationResult<void, Error, void, unknown>;
};

export const PaginationContext = createContext<PaginationContextType | null>(
    null
);
