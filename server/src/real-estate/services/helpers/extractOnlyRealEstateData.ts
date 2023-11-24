import { Yad2RealEstateResponse, Yad2RealEstateItem, Yad2AdvertisementItem } from "../types"
import { RealEstate } from "../../dtos/real-estate.dto";

/**
 * Extracts only the real estate data from the Yad2RealEstateResponse.
 * @param {Yad2RealEstateResponse} yad2Data The Yad2RealEstateResponse containing the data to be extracted.
 * @returns {RealEstate[]} An array of RealEstate objects containing the extracted data.
 */
export const extractOnlyRealEstateData = (yad2Data: Yad2RealEstateResponse): RealEstate[] => {
    return yad2Data.data.feed.feed_items.reduce((acc: RealEstate[], item: Yad2RealEstateItem | Yad2AdvertisementItem) => {
        // Some items serve as ads and don't have any 
        // real estate data so we want to filter them out
        if (!isYad2RealEstateItem(item)) return acc;

        // We don't want items that are being sold by a real estate agent because they
        // are randomly placed in the feed with little regard to what page they are in
        if (item.highlight_text === 'תיווך') return acc;

        acc.push({
            status: 'default', // for now, we don't have a way to determine if the item is new or updated.
            linkToken: item.id,
            estateType: item.title_2,
            street: item.title_1,
            neighborhood: item.neighborhood,
            city: item.city,
            rooms: item.row_4[0].value,
            floor: item.row_4[1].value as number | 'קרקע',
            squareMeters: item.row_4[2].value,
            price: item.price,
            updatedAt: item.date
        })

        return acc;
    }, []);
}

/**
 * Determines if the given item is a Yad2RealEstateItem.
 * @param item The item to check.
 * @returns True if the item is a RealEstateItemDto, false otherwise.
*/
const isYad2RealEstateItem = (item: Yad2RealEstateItem | Yad2AdvertisementItem): item is Yad2RealEstateItem => {
    return 'id' in item
}