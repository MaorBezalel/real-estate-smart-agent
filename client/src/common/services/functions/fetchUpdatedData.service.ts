import axios from "axios";
import { UpdatedRealEstateGetResponseDto } from '@common/data/dtos/responses.dto';

/**
 * Fetches updated data from the API based on the provided search ID.
 * 
 * @param {string} searchId The search ID to be used in the API call.
 * @returns {Promise<UpdatedRealEstateGetResponseDto>} A promise that resolves to the updated data fetched from the API.
 */
export const fetchUpdatedData = async (searchId: string): Promise<UpdatedRealEstateGetResponseDto> => {
    const origin = import.meta.env.VITE_API_ORIGIN;
    const pathname = import.meta.env.VITE_API_UPDATE_PATHNAME;
    const searchParams = `?searchId=${searchId}`;

    const url = `${origin}${pathname}${searchParams}`;
    const response = await axios.get<UpdatedRealEstateGetResponseDto>(url);

    return response.data;
}