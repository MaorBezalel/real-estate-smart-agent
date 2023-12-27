import axios from "axios";

/**
 * Deletes data using the Axios API (using the DELETE method) and the provided search ID.
 * Called when the user explicitly cancel the search (by clicking the cancel button).
 * 
 * @param {string} searchId The search ID to be used in the API call.
 * @returns {Promise<void>} A promise that resolves to nothing.
 */
export const deleteDataWithAxios = async (searchId: string): Promise<void> => {
    const origin = import.meta.env.VITE_API_ORIGIN;
    const pathname = import.meta.env.VITE_API_CANCEL_PATHNAME;
    const searchParams = `?searchId=${searchId}`;

    const url = `${origin}${pathname}${searchParams}`;
    await axios.delete(url);
}