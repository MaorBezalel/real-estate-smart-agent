import { Yad2AdvertisementItem, Yad2RealEstateItem } from './yad2.common.types';

export type Yad2RealEstateResponse = {
    /** The data returned by the API. */
    data: {
        /** The feed object containing the feed items and total pages. */
        feed: {
            /** An array of feed items each containing the data of a real estate property. */
            feed_items: (Yad2RealEstateItem | Yad2AdvertisementItem)[];

            /** The current page of the feed. */
            current_page: number;

            /** The total number of pages containing feed items. */
            total_pages: number;

            /** Any additional properties returned by the API. */
            [key: string]: unknown;
        }

        /** Any additional properties returned by the API. */
        [key: string]: unknown;
    };

    /** Any additional properties returned by the API. */
    [key: string]: unknown;
}

export type Yad2CityCodeResponse = {
    /** The data returned by the API which contain various codes */
    value: {
        /** The city code of the city. */
        city: string;

        /** Additional codes that may be present in this data object. */
        [key: string]: unknown;
    }

    /** Additional properties that may be present in this data object. */
    [key: string]: unknown;
}