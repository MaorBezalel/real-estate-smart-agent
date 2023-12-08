import { ApiProperty } from '@nestjs/swagger';

/** The search params that were used to fetch the real estate data. */
export class SearchParams {
    /** The type of real estate request, either 'forsale' or 'rent'. */
    @ApiProperty({
        type: String,
        enum: ['forsale', 'rent'],
        description: 'The type of real estate request, either \'forsale\' or \'rent\'.',
        example: 'forsale',
    })
    dealType: 'forsale' | 'rent';

    /** The settlement to search for real estate properties in. */
    @ApiProperty({
        type: String,
        description: 'The settlement to search for real estate properties in.',
        example: 'חולון',
    })
    settlement: string;

    /** The settlement code to search for real estate properties in. */
    @ApiProperty({
        type: String,
        description: 'The settlement code to search for real estate properties in.',
        example: '6600',
    })
    cityCode: string;

    /** The minimum price of real estate properties to search for. */
    @ApiProperty({
        type: Number,
        description: 'The minimum price of real estate properties to search for.',
        example: 0,
    })
    minPrice: number;

    /** The maximum price of real estate properties to search for. */
    @ApiProperty({
        type: Number,
        description: 'The maximum price of real estate properties to search for.',
        example: 1_000_000,
    })
    maxPrice: number;

    /** The page number we want to fetch data from. */
    @ApiProperty({
        type: Number,
        description: 'The page number we want to fetch data from.',
        example: 1,
    })
    page: number;
}