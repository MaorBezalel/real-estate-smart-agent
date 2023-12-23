import { useSearchState } from '../../common/hooks';

import { SearchStateContext } from '../../common/contexts';
import { SearchFormContext } from '../../features/search-form/contexts';

import Main from '../../layouts/main/Main';

import PageHeading from '../../common/components/PageHeading';
import Separator from './components/Separator';
import SearchResults from './components/search-results/SearchResults';

import SearchForm from '../../features/search-form';
import {
    DealTypeSelectField,
    FormButton,
    PriceInputField,
    SettlementSearchField,
} from '../../features/search-form/components';

export default function SearchPage(): React.JSX.Element {
    const searchState = useSearchState();

    const [page, headingContent] = ['search' as 'search', 'חיפוש נדל"ן:'];

    return (
        <SearchStateContext.Provider value={searchState}>
            <Main page="search">
                <PageHeading page={page} content={headingContent} />
                <SearchFormContext>
                    <SearchForm>
                        <DealTypeSelectField />
                        <SettlementSearchField />
                        <PriceInputField type="minPrice" />
                        <PriceInputField type="maxPrice" />
                        <FormButton />
                    </SearchForm>
                </SearchFormContext>
                {!searchState.isInactive() && (
                    <>
                        <Separator />
                        <SearchResults />
                    </>
                )}
            </Main>
        </SearchStateContext.Provider>
    );
}
