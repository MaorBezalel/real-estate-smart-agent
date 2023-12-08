/** Represents a real estate property of a feed item in the initial Yad2 response. */
export type Yad2RealEstateItem = {
    /** The ID of the real estate. Also serves as a link token to the item's detailed page. */
    id: string;

    /** The address of the real estate. */
    title_1: string;

    /** The neighborhood of the real estate. */
    neighborhood: string;

    /** The settlement of the real estate. */
    settlement: string;

    /** The type of real estate asset (e.g. apartment, house, etc.). */
    title_2: string;

    /** The basic data of the real estate (e.g. number of rooms, floor, and square meters). */
    row_4: [
        RoomsData,
        FloorData,
        SquareMetersData
    ];

    /** 
     * The date the feed item was last updated. 
     * @remarks It comes as a string in the format of 'YYYY-MM-DD HH:MM:SS'. Can be converted to a Date object using new Date(dateString).
    */
    date: string;

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