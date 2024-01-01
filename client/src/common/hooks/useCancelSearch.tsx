import { useEffect, Dispatch, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePageHide } from '@common/hooks';
import { useDeleteDataFromDB } from '@common/services/hooks';

/**
 * A hook which is responsible for cancelling the search, either explicitly or implicitly.
 * @remark - Implicit cancellation occurs when the user closes the tab or navigates away from the page.
 * @remark - Explicit cancellation occurs when the user clicks the form's cancel button.
 *
 * @param {boolean} isSearchInactive - A boolean indicating whether the search is inactive.
 * @param {string} searchId - The ID of the search to cancel.
 * @param {Dispatch<SetStateAction<string>>} setSearchId - A function to update the search ID.
 * @returns {void}
 */
export default function useCancelSearch(
    isSearchInactive: boolean,
    searchId: string,
    setSearchId: Dispatch<SetStateAction<string>>
): void {
    const queryClient = useQueryClient();
    const { deleteDataExplicitly, deleteDataImplicitly } = useDeleteDataFromDB(searchId, setSearchId);

    // Fires when a search turns inactive, but a searchId still exists,
    // which means that a search turned inactive recently.
    // (specifically, when the user cancel the search explicitly via the cancel button).
    useEffect(() => {
        if (isSearchInactive) {
            if (!!searchId) deleteDataExplicitly();
            queryClient.resetQueries();
        }
    }, [isSearchInactive, searchId]);

    // Fires when the user either closes the tab, navigates away from the page, or refreshes the page.
    // (specifically, when the user cancel a search implicitly via the page hide event).
    usePageHide(() => {
        if (!!searchId) deleteDataImplicitly();
    });
}
