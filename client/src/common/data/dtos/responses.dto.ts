import { RealEstateDto } from "./real-estate.dto";

export class InitialRealEstateGetResponseDto {
    /** The ID of the real estate filtered search. Will serve as a token to fetch more updated data on the same search. */
    search_id: string;

    /** The real estate items. */
    items: RealEstateDto[];

    /** The total number of pages that real estate items can be fetched from. */
    total_pages: number;
}

export class UpdatedRealEstateGetResponseDto {
    /** The real estate items. */
    items: RealEstateDto[];

    /** The search filter that was used in the initial search and will be used to fetch updated data. */
    search_filter: unknown;

    /** The total number of pages that real estate data can be fetched from. */
    total_pages: number;
}