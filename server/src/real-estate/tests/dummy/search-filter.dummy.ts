import { InitialSearchFilter, FinalSearchFilter } from "src/real-estate/types/search-filter.objects";

export const dummyInitialSearchFilter = (): InitialSearchFilter => ({
    type: 'forsale',
    city: 'עיר דמיונית',
    min_price: 1_000_000,
    max_price: 2_000_000,
});

export const dummyFinalSearchFilter = (): FinalSearchFilter => ({
    type: 'forsale',
    city: 'עיר דמיונית',
    city_code: '1111',
    min_price: 1_000_000,
    max_price: 2_000_000,
    page: 1,
});