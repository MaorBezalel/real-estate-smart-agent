import { createContext } from 'react';
import { useSearchState, SearchState } from '../hooks';

type SearchStateContextType = ReturnType<typeof useSearchState> | undefined;
type SearchStateProviderProps = {
    initialState?: SearchState;
    children: React.ReactNode;
};

export const SearchStateContext = createContext<SearchStateContextType>(undefined);

export const SearchStateProvider = ({
    initialState,
    children,
}: SearchStateProviderProps): React.JSX.Element => {
    const searchState = useSearchState(initialState ?? 'inactive');
    return <SearchStateContext.Provider value={searchState}>{children}</SearchStateContext.Provider>;
};
