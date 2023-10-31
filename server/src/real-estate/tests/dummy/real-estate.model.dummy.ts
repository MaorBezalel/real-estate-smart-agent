import { RealEstateDocumentModel } from "../../models/real-estate-document.model";
import { dummyRealEstateItems } from "./real-estate-items.dummy";
import { dummyFinalSearchFilter } from "./search-filter.dummy";

export const dummyRealEstateDocumentModel = (): RealEstateDocumentModel => ({
    items: dummyRealEstateItems(),
    total_pages: 5,
    search_filter: dummyFinalSearchFilter()
});