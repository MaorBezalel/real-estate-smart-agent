export type Yad2RealEstateRequestParams = {
    /** The type of real estate request, either 'forsale' or 'rent'. */
    dealType: 'forsale' | 'rent';

    /** The settlement code to search for real estate properties in. */
    settlementCode: string;

    /** The minimum price of real estate properties to search for. */
    minPrice: number;

    /** The maximum price of real estate properties to search for. */
    maxPrice: number;

    /** The page number we want to fetch data from. */
    page: number;
}