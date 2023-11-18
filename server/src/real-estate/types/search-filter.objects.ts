/**
 * Represents the search filter that will be used to fetch the initial data from Yad2 API.
 * This filter will not be saved in the database, and will eventually be converted to a FinalSearchFilter.
 */
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

/**
 * Represents the search filter that will be saved in the database and used to fetch updated data.
 * The main difference between this filter and the InitialSearchFilter is that this filter contains the city code,
 * which allow us to only make one API call to Yad2 API instead of two when we want to fetch updated data.
 */
export type FinalSearchFilter = {
    /** The type of real estate request, either 'forsale' or 'rent'. */
    type: 'forsale' | 'rent';

    /** The city to search for real estate properties in. */
    city: string;

    /** The city code to search for real estate properties in. */
    city_code: string;

    /** The minimum price of real estate properties to search for. */
    min_price: number;

    /** The maximum price of real estate properties to search for. */
    max_price: number;

    /** The page number we want to fetch data. */
    page: number;
};