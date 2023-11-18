import { ApiProperty } from '@nestjs/swagger';

/** Represents a real estate object. */
export class RealEstate {
    /** The unique identifier of the real estate object. Also serves as a link token to the item's detailed page. */
    @ApiProperty({
        type: String,
        description: 'The unique identifier of the real estate object. Also serves as a link token to the item\'s detailed page.',
        example: 'vmurovih'
    })
    id: string;

    /** The type of the real estate object (e.g. apartment, house, etc.). */
    @ApiProperty({
        type: String,
        description: 'The type of the real estate object (e.g. apartment, house, etc.).',
        example: 'דירה',
        examples: ['דירה', 'דירת גן', 'פנטהאוז']
    })
    type: string;

    /** The street address of the real estate object. */
    @ApiProperty({
        type: String,
        description: 'The street address of the real estate object.',
        example: 'הרצל 1'
    })
    street: string;

    /** The neighborhood of the real estate object. */
    @ApiProperty({
        type: String,
        description: 'The neighborhood of the real estate object.',
        example: 'רמת יוסף'
    })
    neighborhood: string;

    /** The number of rooms in the real estate object. */
    @ApiProperty({
        type: Number,
        description: 'The number of rooms in the real estate object.',
        example: 3
    })
    rooms: number;

    /** The floor number of the real estate object. 
     * @remarks This can also be a string because floor 0 is represented as 'קרקע'.
    */
    @ApiProperty({
        oneOf: [{ type: 'string' }, { type: 'number' }],
        description: 'The floor number of the real estate object.',
        example: 4,
        examples: ['קרקע', 2]
    })
    floor: string | number;

    /** The square meters of the real estate object. */
    @ApiProperty({
        type: Number,
        description: 'The square meters of the real estate object.',
        example: 80
    })
    squareMeters: number;

    /** The date when the real estate object was last updated in yad2 website. */
    @ApiProperty({
        type: Date,
        description: 'The date when the real estate object was last updated in yad2 website.',
        example: '2021-08-01 12:00:00'
    })
    updatedAt: Date;

    /** The price of the real estate object. */
    @ApiProperty({
        type: String,
        description: 'The price of the real estate object.',
        example: '1,000,000 ₪'
    })
    price: string;
}