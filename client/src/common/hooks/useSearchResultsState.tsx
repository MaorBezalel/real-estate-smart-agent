import { useEffect } from 'react';
import { useBoolean } from '@common/hooks';

type UseSearchResultsStateProps = {
    isQuery: {
        loading: boolean;
        error: boolean;
        success: boolean;
    };

    isSearch: {
        loading: boolean;
        active: boolean;
    };

    setSearchTo: {
        loading: () => void;
        active: () => void;
    };
};

type UseSearchResultsStateResult = {
    isLoadingBeforeError: boolean;
    isLoadingAfterError: boolean;
};

export default function useSearchResultsState({
    isQuery,
    isSearch,
    setSearchTo,
}: UseSearchResultsStateProps): UseSearchResultsStateResult {
    const {
        value: hasErrorOccurredBeforeSuccess,
        setTrue: setErrorHadOccurred,
        setFalse: setErrorHadNotOccurred,
    } = useBoolean(false);

    useEffect(() => {
        if (isQuery.loading && !hasErrorOccurredBeforeSuccess) {
            setSearchTo.loading();
        } else if (isQuery.success && !isSearch.active) {
            setSearchTo.active();
        }
    }, [isQuery.loading, isQuery.success, isSearch.loading]);

    useEffect(() => {
        if (isQuery.error) {
            setErrorHadOccurred();
        }
        if (isQuery.success) {
            setErrorHadNotOccurred();
        }
    }, [isQuery.error, isQuery.success]);

    return {
        isLoadingBeforeError: isQuery.loading && !hasErrorOccurredBeforeSuccess,
        isLoadingAfterError: isQuery.error || hasErrorOccurredBeforeSuccess,
    };
}
