import { InitialYad2RealEstateResponse, FinalYad2RealEstateResponse, Yad2RealEstateItem, Yad2AdvertisementItem } from "src/real-estate/types/yad2.responses";
import { dummyRealEstateItems } from "./real-estate-items.dummy";
import { dummyFinalSearchFilter } from "./search-filter.dummy";
import { dummyYad2RealEstateItems, dummyYad2AdvertisementItems } from "./yad2-items.dummy";

export const dummyInitialYad2RealEstateResponse = (): InitialYad2RealEstateResponse => ({
    data: {
        feed: {
            feed_items: [
                ...dummyYad2RealEstateItems(),
                ...dummyYad2AdvertisementItems()
            ],
            searchFilter: dummyFinalSearchFilter(),
            total_pages: 5
        }
    },
    message: 'OK'
});

export const dummyFinalYad2RealEstateResponse = (): FinalYad2RealEstateResponse => ({
    data: {
        feed_items: dummyRealEstateItems(),
        searchFilter: dummyFinalSearchFilter(),
        total_pages: 5
    },
    message: 'OK'
});