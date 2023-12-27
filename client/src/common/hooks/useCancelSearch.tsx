import { useEffect, Dispatch, SetStateAction } from 'react';
import { useDeleteDataFromDB, usePageHide } from '.';

//import { SearchState } from '.';

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
    const { deleteDataExplicitly, deleteDataImplicitly } = useDeleteDataFromDB(searchId, setSearchId);

    // Fires when the search turns inactive, but the searchId still exists,
    // which means that the search turned inactive recently.
    // (specifically, when the user cancel the search explicitly via the cancel button).
    useEffect(() => {
        if (isSearchInactive && !!searchId) {
            deleteDataExplicitly();
        }
    }, [isSearchInactive, searchId]);

    // Fires when the user either closes the tab, navigates away from the page, or refreshes the page.
    // (specifically, when the user cancel the search implicitly via the page hide event).
    usePageHide(() => {
        if (!!searchId) {
            deleteDataImplicitly();
        }
    });
}
