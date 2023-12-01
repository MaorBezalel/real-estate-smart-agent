import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RealEstate } from '../utils/dtos/real-estate.dto';
import { SearchParams } from '../utils/dtos/search-params.dto';

/**
 * Represents a MongoDB document for real estate search results data.
 */
@Schema()
export class RealEstateDocumentModel {
    /** The list of real estate items in the document. */
    @Prop({ required: true }) // type: [RealEstate]
    items: RealEstate[];

    /** The search params that were used to fetch the real estate data. */
    @Prop({ required: true, type: SearchParams })
    search_params: SearchParams;

    /** The total number of pages that real estate data can be fetched from. */
    @Prop({ required: true, type: Number })
    total_pages: number;

}

/** Represents a MongoDB schema for real estate search results data. */
export const RealEstateDocumentSchema = SchemaFactory.createForClass(RealEstateDocumentModel);