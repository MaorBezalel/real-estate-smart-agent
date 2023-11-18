import { RealEstate } from '../dtos/real-estate.item.dto';
import { FinalSearchFilter } from './search-filter.objects';

export type InitialYad2RealEstateResponse = {
    /** The data returned by the API. */
    data: {
        /** The feed object containing the feed items and total pages. */
        feed: {
            /** An array of feed items each containing the data of a real estate property. */
            feed_items: (Yad2RealEstateItem | Yad2AdvertisementItem)[];

            /** The total number of pages containing feed items. */
            total_pages: number;

            /** Any additional properties returned by the API. */
            [key: string]: unknown;
        }

        /** Any additional properties returned by the API. */
        [key: string]: unknown;
    };

    /** A message returned by the API. */
    message: string;
}

export type FinalYad2RealEstateResponse = {
    /** The data returned by the API. */
    data: {
        /** An array of real estate items. */
        feed_items: RealEstate[];

        /** The search filter used to fetch the data. */
        searchFilter: FinalSearchFilter;

        /** The total number of pages in the response. */
        total_pages: number;
    };

    /** A message returned by the API. */
    message: string;
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

/** Represents a real estate property of a feed item in the initial Yad2 response. */
export type Yad2RealEstateItem = {
    /** The ID of the real estate. Also serves as a link token to the item's detailed page. */
    id: string;

    /** The address of the real estate. */
    title_1: string;

    /** The neighborhood of the real estate. */
    neighborhood: string;

    /** The type of real estate asset (e.g. apartment, house, etc.). */
    title_2: string;

    /** The basic data of the real estate (e.g. number of rooms, floor, and square meters). */
    row_4: [
        RoomsData,
        FloorData,
        SquareMetersData
    ];

    /** The date the feed item was last updated. */
    date: Date;

    /** The price of the real estate. */
    price: string;

    /** The type of the feed item (e.g. 'תיווך' for real estate agents). */
    highlight_text: string;

    /** Additional data of the real estate. */
    [key: string]: unknown;
}

/** Represents a data transfer object for a Yad2 advertisement. */
export type Yad2AdvertisementItem = {
    /** The data in the advertisement. */
    [key: string]: unknown;
}

/** Represents the rooms data of a real estate property. */
type RoomsData = {
    /** Represents the number of rooms in the real estate property. */
    value: number;

    /** Additional properties that may be present in the data object. */
    [key: string]: unknown;
}

/** Represents the floor data of a real estate property. */
type FloorData = {
    /** Represents the floor number of the real estate property (note: this can also be a string because floor 0 is represented as 'קרקע'). */
    value: string | number;

    /** Additional properties that may be present in the data object. */
    [key: string]: unknown;
}

/** Represents the square meters data of a real estate property. */
type SquareMetersData = {
    /** Represents the square meters of the real estate property. */
    value: number;

    /** Additional properties that may be present in the data object. */
    [key: string]: unknown;
}