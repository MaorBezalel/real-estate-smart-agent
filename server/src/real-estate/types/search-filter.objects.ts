export type InitialSearchFilter = {
    /** The type of real estate request, either 'forsale' or 'rent'. */
    type: 'forsale' | 'rent';

    /** The city to search for real estate properties in. */
    city: string;

    /** The minimum price of real estate properties to search for. */
    min_price: number;

    /** The maximum price of real estate properties to search for. */
    max_price: number;
};

export type FinalSearchFilter = {
    /** The type of real estate request, either 'forsale' or 'rent'. */
    type: 'forsale' | 'rent';

    /** The city code to search for real estate properties in. */
    city_code: string;

    /** The minimum price of real estate properties to search for. */
    min_price: number;

    /** The maximum price of real estate properties to search for. */
    max_price: number;

    /** The page number we want to fetch data. */
    page: number;
};