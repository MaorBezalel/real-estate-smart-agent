import { ApiProperty } from '@nestjs/swagger';
import { RealEstate } from './real-estate.dto';
import { SearchParams } from './search-params.dto';

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
        example: [{
            status: 'new',
            linkToken: 'vmurovih',
            estateType: 'דירה',
            street: 'הרצל 1',
            neighborhood: 'רמת יוסף',
            settlement: 'רמת גן',
            rooms: 3,
            floor: 2,
            squareMeters: 80,
            price: '1,000,000 ₪',
            updatedAt: '2021-08-01 12:00:00'
        },
        {
            status: 'updated',
            linkToken: 'ewfjwef',
            estateType: 'דירה',
            street: 'סוקולוב 40',
            neighborhood: 'אגרובנק',
            settlement: 'חולון',
            rooms: 4,
            floor: 3,
            squareMeters: 110,
            price: '2,500,000 ₪',
            updatedAt: '2021-08-01 12:05:00'
        },
        {
            status: 'removed',
            linkToken: 'qk0s7rss',
            estateType: 'דירה',
            street: 'שדרות הבעש"ט 9',
            neighborhood: 'רמת אביב',
            settlement: 'תל אביב יפו',
            rooms: 1.5,
            floor: 1,
            squareMeters: 27,
            updatedAt: '2021-08-01 11:30:55',
            price: '1,750,000 ₪'
        }]
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
        example: [{
            status: 'new',
            linkToken: 'vmurovih',
            estateType: 'דירה',
            street: 'הרצל 1',
            neighborhood: 'רמת יוסף',
            settlement: 'רמת גן',
            rooms: 3,
            floor: 2,
            squareMeters: 80,
            price: '1,000,000 ₪',
            updatedAt: '2021-08-01 12:00:00'
        },
        {
            status: 'updated',
            linkToken: 'ewfjwef',
            estateType: 'דירה',
            street: 'סוקולוב 40',
            neighborhood: 'אגרובנק',
            settlement: 'חולון',
            rooms: 4,
            floor: 3,
            squareMeters: 110,
            price: '2,500,000 ₪',
            updatedAt: '2021-08-01 12:05:00'
        },
        {
            status: 'default',
            linkToken: 'qk0s7rss',
            estateType: 'דירה',
            street: 'שדרות הבעש"ט 9',
            neighborhood: 'רמת אביב',
            settlement: 'תל אביב יפו',
            rooms: 1.5,
            floor: 1,
            squareMeters: 27,
            updatedAt: '2021-08-01 11:30:55',
            price: '1,750,000 ₪'
        }]
    })
    items: RealEstate[];

    /** The search filter that was used and will be used to fetch updated data. */
    @ApiProperty({
        type: SearchParams,
        description: 'The search filter that was used and will be used to fetch updated data.',
        example: {
            dealType: 'forsale',
            settlement: 'רמת גן',
            cityCode: '5000',
            minPrice: 0,
            maxPrice: 1_000_000,
            page: 1
        }
    })
    search_params: SearchParams;

    /** The total number of pages that real estate data with the same search params can be fetched from. */
    @ApiProperty({
        type: Number,
        description: 'The total number of pages that real estate items can be fetched from.',
        example: 5
    })
    total_pages: number;
}