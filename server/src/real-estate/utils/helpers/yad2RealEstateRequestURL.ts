import { Yad2RealEstateRequestParams } from "../types";

/**
 * Assemble a request URL for Yad2 Real Estate API.
 * @param {string} baseURL The base URL of the Yad2 Real Estate API.
 * @param {Yad2RealEstateRequestParams} searchParams The search filter to generate the URL from.
 * @returns {string} A request URL for Yad2 Real Estate API.
*/
export const yad2RealEstateRequestURL = (baseURL: string, searchParams: Yad2RealEstateRequestParams): string => {
    const dealTypeField = `${searchParams.dealType}`;
    const settlementCodeField = `settlement=${searchParams.settlementCode}`;
    const propertyGroupField = 'propertyGroup=apartments,houses';
    const priceField = `price=${searchParams.minPrice}-${searchParams.maxPrice}`;
    const pageField = `page=${(searchParams.page >= 0) ? searchParams.page : 1}`;
    const forceLdLoadField = 'forceLdLoad=true';

    return `${baseURL}/${dealTypeField}?${settlementCodeField}&${propertyGroupField}&${priceField}&${pageField}&${forceLdLoadField}`;
}