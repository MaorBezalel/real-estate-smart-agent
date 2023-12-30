import { useEffect } from 'react';
import { useBoolean } from '@common/hooks';

type UseManageSearchResultsDuringFetchProps = {
    isQuery: {
        loading: boolean;
        error: boolean;
        success: boolean;
    };

    isSearch: {
        inactive: boolean;
    };

    setSearchTo: {
        active: () => void;
    };
};

type UseManageSearchResultsDuringFetchResult = {
    isLoadingBeforeError: boolean;
    isLoadingAfterError: boolean;
};

/**
 * Custom hook for managing search results state.
 *
 * @param {UseManageSearchResultsDuringFetchProps} options - The options for the hook.
 * @returns {UseManageSearchResultsDuringFetchResult} - An object containing the search results state.
 */
export default function useManageSearchResultsDuringFetch({
    isQuery,
    isSearch,
    setSearchTo,
}: UseManageSearchResultsDuringFetchProps): UseManageSearchResultsDuringFetchResult {
    const {
        value: hasErrorOccurredBeforeSuccess,
        setTrue: setErrorHadOccurred,
        setFalse: setErrorHadNotOccurred,
    } = useBoolean(false);

    useEffect(() => {
        if (isSearch.inactive) setErrorHadNotOccurred();
        else if (isQuery.success) {
            setSearchTo.active();
            setErrorHadNotOccurred();
        } else if (isQuery.error) {
            setSearchTo.active();
            setErrorHadOccurred();
        }
    }, [isQuery.loading, isQuery.success, isQuery.error, isSearch.inactive]);

    return {
        isLoadingBeforeError: isQuery.loading && !hasErrorOccurredBeforeSuccess,
        isLoadingAfterError: hasErrorOccurredBeforeSuccess,
    };
}
