import { useSearchState, useCancelSearch, useManageSearchResultsDuringFetch, useOrderItems } from '@common/hooks';
import { useFetchRealEstateData } from '@common/services/hooks';

import { SearchStateContext } from '@common/contexts';

import Main from '@layouts/main';
import PageHeading from '@common/components/page-heading/SearchPageHeading';
import Separator from '@common/components/separator/SearchPageSeparator';

import { SearchFormContext } from '@features/search-form/contexts';
import SearchForm from '@features/search-form';
import { DealTypeSelectField, FormButton, PriceInputField, SettlementSearchField } from '@features/search-form/components';

import FailedResults from '@features/failed-results';
import LoadingResults from '@features/loading-results';

import ResultsControls from '@features/results-controls';
import { ItemCount, SortByDropdownMenu } from '@features/results-controls/components';
import { sortObjectsByDate, sortObjectsByPrice } from '@common/helpers';

import RealEstateList from 'react-flip-move';
import RealEstateItem from '@features/real-estate-item';
import { RealEstateDto } from '@common/data/dtos/real-estate.dto';

import Pagination from '@features/pagination';
import { PaginationBody, PaginationButton } from '@features/pagination/components';

export default function SearchPage(): React.JSX.Element {
    const searchState = useSearchState('inactive');

    const { query, searchId, setSearchId } = useFetchRealEstateData(!searchState.isInactive());
    useCancelSearch(searchState.isInactive(), searchId, setSearchId);

    const { isLoadingBeforeError, isLoadingAfterError } = useManageSearchResultsDuringFetch({
        isQuery: {
            loading: query.isLoading,
            error: query.isError,
            success: query.isSuccess,
        },

        isSearch: {
            inactive: searchState.isInactive(),
        },

        setSearchTo: {
            active: searchState.setToActive,
        },
    });

    const orderOptions = ['לפי תאריך', 'מחיר - מהזול ליקר', 'מחיר - מהיקר לזול'] as const;
    const orderBy: { id: string; method: (items: RealEstateDto[]) => RealEstateDto[] }[] = [
        { id: '1', method: (items: RealEstateDto[]) => sortObjectsByDate(items, 'updatedAt') },
        { id: '2', method: (items: RealEstateDto[]) => sortObjectsByPrice(items, 'price', 'ascending') },
        { id: '3', method: (items: RealEstateDto[]) => sortObjectsByPrice(items, 'price', 'descending') },
    ];
    const orderItems = useOrderItems(orderBy);

    return (
        <Main page="search">
            <SearchStateContext.Provider value={searchState}>
                <PageHeading />
                <SearchFormContext>
                    <SearchForm>
                        <DealTypeSelectField />
                        <SettlementSearchField />
                        <PriceInputField type="minPrice" />
                        <PriceInputField type="maxPrice" />
                        <FormButton />
                    </SearchForm>
                </SearchFormContext>
            </SearchStateContext.Provider>
            {!searchState.isInactive() && <Separator />}
            {isLoadingBeforeError && <LoadingResults />}
            {isLoadingAfterError && <FailedResults />}
            {query.isSuccess && (
                <section className="flex h-full w-full flex-col gap-4">
                    <ResultsControls>
                        <ItemCount count={30} />
                        <SortByDropdownMenu options={orderOptions} />
                    </ResultsControls>
                    <RealEstateList
                        className="flex h-full w-full flex-col gap-4"
                        typeName="ul"
                        duration={500}
                        appearAnimation="fade"
                        staggerDurationBy={50}
                    >
                        {orderItems(query.data.items).map((realEstate) => (
                            <RealEstateItem key={realEstate.linkToken} {...realEstate} />
                        ))}
                    </RealEstateList>
                    <Pagination totalPages={query.data.total_pages}>
                        <PaginationButton type="prev" />
                        <PaginationBody />
                        <PaginationButton type="next" />
                    </Pagination>
                </section>
            )}
        </Main>
    );
}
