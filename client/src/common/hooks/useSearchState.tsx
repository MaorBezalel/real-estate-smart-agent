import { Dispatch, SetStateAction, useState, useCallback } from 'react';

export type SearchState = 'active' | 'inactive' | 'loading';

type UseSearchStateResult = {
    value: SearchState;
    setValue: Dispatch<SetStateAction<SearchState>>;
    setToActive: () => void;
    setToInactive: () => void;
    setToLoading: () => void;
    isActive: () => boolean;
    isInactive: () => boolean;
    isLoading: () => boolean;
};

export default function useSearchState(defaultValue?: SearchState): UseSearchStateResult {
    const [value, setValue] = useState<SearchState>(defaultValue ?? 'inactive');

    const setToActive = useCallback(() => setValue('active'), []);
    const setToInactive = useCallback(() => setValue('inactive'), []);
    const setToLoading = useCallback(() => setValue('loading'), []);

    const isActive = useCallback(() => value === 'active', [value]);
    const isInactive = useCallback(() => value === 'inactive', [value]);
    const isLoading = useCallback(() => value === 'loading', [value]);

    return {
        value,
        setValue,
        setToActive,
        setToInactive,
        setToLoading,
        isActive,
        isInactive,
        isLoading,
    };
}
