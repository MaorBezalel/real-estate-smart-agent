/**
 * Deletes data using the Beacon API.
 * Called when the user implicitly cancel the search (by navigating to another page, closing the tab, or refreshing the page).
 * 
 * @param {string} searchId The search ID to be used in the API call.
 */
export const deleteDataWithBeacon = (searchId: string): void => {
    const origin = import.meta.env.VITE_API_ORIGIN;
    const pathname = import.meta.env.VITE_API_CANCEL_UPON_SEND_BEACON_PATHNAME;

    const url = `${origin}${pathname}`;
    const data = JSON.stringify({ searchId: searchId });

    navigator.sendBeacon(url, data);
}