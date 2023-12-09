import { useState, useEffect, useMemo, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSmartAgent } from '../../hooks';

import {
    SearchPageContext,
    SearchPageContextType,
} from '../../SearchPageContext';

import { SearchResultsHeader, TotalAmount, SortBy } from './header';

import { FailedSearchError, Content, Illustration } from './error';
import LoadingAnimation from './loading/LoadingAnimation';

import RealEstateList from 'react-flip-move';
import RealEstateItem from './real-estate-item/RealEstateItem';
import {
    Pagination,
    PaginationNumberList,
    PaginationNumber,
    PaginationButton,
} from './pagination';

import {
    generatePagination,
    sortObjectsByDate,
    sortObjectsByPrice,
} from '../../utils/helpers';
import { RealEstateDto } from '../../utils/dtos/real-estate.dto';

export default function SearchResults(
    props: React.OutputHTMLAttributes<HTMLOutputElement>
): React.JSX.Element {
    const { query, mutation } = useSmartAgent(1000 * 10); // 10 seconds
    const [searchParams, _] = useSearchParams();

    const [sortBy, setSortBy] = useState<string>('לפי תאריך');
    const sortedItems: RealEstateDto[] | undefined = useMemo(() => {
        const items = query.data?.items;

        if (!items) return undefined;

        switch (sortBy) {
            case 'לפי תאריך':
                return sortObjectsByDate(items, 'updatedAt');
            case 'מחיר - מהזול ליקר':
                return sortObjectsByPrice(items, 'price', 'ascending');
            case 'מחיר - מהיקר לזול':
                return sortObjectsByPrice(items, 'price', 'descending');
            default:
                return sortObjectsByDate(items, 'updatedAt');
        }
    }, [query.data?.items, sortBy]);

    const { setIsLoading } = useContext(
        SearchPageContext
    ) as SearchPageContextType;
    useEffect(() => {
        if (query.isLoading && !hasErrorOccured) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [query.isLoading]);

    const [hasErrorOccured, setHasErrorOccured] = useState<boolean>(false);
    useEffect(() => {
        if (query.isError) {
            setHasErrorOccured(true);
        }
        if (query.isSuccess) {
            setHasErrorOccured(false);
        }
    }, [query.isError, query.isSuccess]);

    if (query.isLoading && !hasErrorOccured) {
        return <LoadingAnimation />;
    }

    if (query.isError || hasErrorOccured) {
        console.log('query.isError');
        return (
            <FailedSearchError>
                <Content />
                <Illustration />
            </FailedSearchError>
        );
    }

    const paginationProps = {
        currentPage: Number(searchParams.get('page') || 1),
        totalPages: query.data?.total_pages || 0,
        mutation: mutation,
    };

    return (
        <section className="flex h-full w-full flex-col gap-4" {...props}>
            <SearchResultsHeader>
                <TotalAmount totalAmount={sortedItems?.length || 0} />
                <SortBy
                    options={[
                        'לפי תאריך',
                        'מחיר - מהזול ליקר',
                        'מחיר - מהיקר לזול',
                    ]}
                    selectedOption={sortBy}
                    setSelectedOption={setSortBy}
                />
            </SearchResultsHeader>
            <RealEstateList
                className="flex h-full w-full flex-col gap-4"
                typeName="ul"
                duration={500}
                appearAnimation="fade"
                staggerDurationBy={50}
            >
                {sortedItems?.map((realEstate) => (
                    <RealEstateItem
                        key={realEstate.linkToken}
                        {...realEstate}
                    />
                ))}
            </RealEstateList>
            <Pagination id="pagination" {...paginationProps}>
                <PaginationButton type="prev" />
                <PaginationNumberList>
                    {generatePagination(
                        paginationProps.currentPage,
                        paginationProps.totalPages
                    ).map((pageNumber, index) => (
                        <PaginationNumber key={index} pageNumber={pageNumber} />
                    ))}
                </PaginationNumberList>
                <PaginationButton type="next" />
            </Pagination>
        </section>
    );
}
