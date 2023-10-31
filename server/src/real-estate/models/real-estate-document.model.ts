import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RealEstate } from '../dtos/real-estate.item.dto';
import { FinalSearchFilter } from '../types/search-filter.objects';

/**
 * Represents a MongoDB document for real estate search results data.
 */
@Schema()
export class RealEstateDocumentModel {
    /** The list of real estate items in the document. */
    @Prop({ required: true })
    items: RealEstate[];

    /** The total number of pages that real estate data can be fetched from. */
    @Prop({ required: true })
    total_pages: number;

    /** The search filter used to generate the document. */
    @Prop({ required: true, type: Object })
    search_filter: FinalSearchFilter;
}

/**
 * Represents a MongoDB schema for real estate search results data.
 */
export const RealEstateDocumentSchema = SchemaFactory.createForClass(RealEstateDocumentModel);