import axios from "axios";
import { InitialRealEstateGetResponseDto } from '@common/data/dtos/responses.dto';

/**
 * Fetches initial data from the API based on the provided search parameters.
 * 
 * @param {string} searchParams The search parameters to be used in the API call.
 * @param {boolean} saveToDb Whether to save the data to the database or not.
 * @returns {Promise<InitialRealEstateGetResponseDto>} A promise that resolves to the initial data fetched from the API (data contains the search ID to ask for updated data).
 */
export const fetchInitialData = async (searchParams: string, saveToDb: boolean): Promise<InitialRealEstateGetResponseDto> => {
    const origin = import.meta.env.VITE_API_ORIGIN;
    const pathname = import.meta.env.VITE_API_SEARCH_PATHNAME;
    const searchQuery = searchParams + `&saveToDb=${saveToDb}`;

    const url = `${origin}${pathname}${searchQuery}`;
    const response = await axios.get<InitialRealEstateGetResponseDto>(url);

    return response.data;
}