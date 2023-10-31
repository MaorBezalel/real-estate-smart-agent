import { GetInitialSearchResultsResponse, GetUpdatedSearchResultsResponse } from "src/real-estate/dtos/real-estate.responses.dto";
import { dummyRealEstateItems } from "./real-estate-items.dummy";
import { dummyId } from "./document.dummy";

export const dummyInitialSearchResultsResponse = (): GetInitialSearchResultsResponse => ({
    search_id: dummyId,
    items: dummyRealEstateItems(),
    total_pages: 5
});

export const dummyUpdatedSearchResultsResponse = (): GetUpdatedSearchResultsResponse => ({
    items: dummyRealEstateItems(),
    total_pages: 5
});