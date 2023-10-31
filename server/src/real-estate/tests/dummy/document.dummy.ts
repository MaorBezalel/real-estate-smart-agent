import { Document, Types } from "mongoose";
import { RealEstateDocumentModel } from "../../models/real-estate-document.model";
import { dummyRealEstateItems } from "./real-estate-items.dummy";
import { dummyFinalSearchFilter } from "./search-filter.dummy";

export const dummyId: string = '1a2b3c4d5e6f7a8b9c0d1e2f';

export const dummyDocument = (): RealEstateDocumentModel & { _id: Types.ObjectId; } => ({
    _id: new Types.ObjectId(dummyId),
    items: dummyRealEstateItems(),
    total_pages: 5,
    search_filter: dummyFinalSearchFilter()
});