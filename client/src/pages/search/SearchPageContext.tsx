import { createContext } from 'react';

export type SearchPageContextType = {
    isSubmitSuccessful: boolean;
    setIsSubmitSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchPageContext = createContext<SearchPageContextType | null>(
    null
);
