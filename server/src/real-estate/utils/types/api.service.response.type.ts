import { RealEstate } from "src/real-estate/utils/dtos/real-estate.dto";
import { SearchParams } from "src/real-estate/utils/dtos/search-params.dto";

export type ApiServiceResponse = {
    /** An array of real estate items. */
    feed_items: RealEstate[];

    /** The search params that were used to fetch the data. */
    search_params: SearchParams;

    /** The total number of pages in the response. */
    total_pages: number;
}