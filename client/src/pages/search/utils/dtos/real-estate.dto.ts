export class RealEstateDto {
    //** Helps the client to determine if the item is new, updated, or default. */
    status: string;

    /** The unique identifier of the real estate object. Also serves as a link token to the item's detailed page. */
    linkToken: string;

    /** The type of the real estate object (e.g. apartment, house, etc.). */
    estateType: string;

    /** The street address of the real estate object. */
    street: string;

    /** The neighborhood of the real estate object. */
    neighborhood: string | undefined;

    /** The settlement of the real estate object. */
    settlement: string;

    /** The number of rooms in the real estate object. */
    rooms: number;

    /** 
     * The floor number of the real estate object. 
     * @remarks It can represented as a string because floor 0 is represented as 'קרקע'.
    */
    floor: string | number;

    /** The square meters of the real estate object. */
    squareMeters: number;

    /** 
     * The date the feed of the real estate object was last updated in yad2.
     * @remarks It comes as a string in the format of 'YYYY-MM-DD HH:MM:SS'. Can be converted to a Date object using new Date().  
    */
    updatedAt: string;

    /** 
     * The price of the real estate object. 
     * @remarks It is represented as a string because it is formatted with commas (e.g. 1,000,000) and a currency sign (e.g. ₪).
    */
    price: string;
}