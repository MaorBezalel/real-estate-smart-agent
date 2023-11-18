import { ApiProperty } from '@nestjs/swagger';
import { RealEstate } from './real-estate.item.dto';
import { FinalSearchFilter } from '../types/search-filter.objects';

/**
 * Represents the response returned by the server when a client requests the initial search results for real estate.
 */
export class GetInitialSearchResultsResponse {
    /** The ID of the real estate filtered search. Will serve as a token to fetch more updated data on the same search. */
    @ApiProperty({
        type: String,
        description: 'The ID of the real estate filtered search. Will serve as a token to fetch more updated data on the same search.',
        example: '612a1e5e4f3b3c1d1b7d0a9f'
    })
    search_id: string;

    /** The real estate items in the response. */
    @ApiProperty({
        type: [RealEstate],
        description: 'The real estate items.',
    })
    items: RealEstate[];

    /** The total number of pages that real estate items can be fetched from. */
    @ApiProperty({
        type: Number,
        description: 'The total number of pages that real estate items can be fetched from.',
        example: 5
    })
    total_pages: number;
}

/**
 * Represents the response returned by the API when fetching updated search results.
 */
export class GetUpdatedSearchResultsResponse {
    /** The real estate items in the response. */
    @ApiProperty({
        type: [RealEstate],
        description: 'The latest up to date real estate items.',
    })
    items: RealEstate[];

    /** The search filter that was used and will be used to fetch updated data. */
    @ApiProperty({
        type: Object,
        description: 'The search filter that was used and will be used to fetch updated data.',
    })
    search_filter: FinalSearchFilter;

    /** The total number of pages that real estate data can be fetched from. */
    @ApiProperty({
        type: Number,
        description: 'The total number of pages that real estate items can be fetched from.',
        example: 5
    })
    total_pages: number;
}