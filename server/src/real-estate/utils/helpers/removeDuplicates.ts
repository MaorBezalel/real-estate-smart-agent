import { RealEstate } from "../dtos/real-estate.dto"

/**
 * Removes duplicate items from an array of RealEstate objects based on the `linkToken` property.
 * @param {RealEstate[]} realEstateItems - The array of RealEstate objects.
 * @returns {RealEstate[]} An array of RealEstate objects with duplicates removed.
 */
export const removeDuplicates = (realEstateItems: RealEstate[]): RealEstate[] => {
    const seen = new Set<string>();
    const filteredRealEstateItems: RealEstate[] = [];

    for (const item of realEstateItems) {
        const { linkToken } = item;
        if (!seen.has(linkToken)) {
            seen.add(linkToken);
            filteredRealEstateItems.push(item);
        }
    }

    return filteredRealEstateItems;
}