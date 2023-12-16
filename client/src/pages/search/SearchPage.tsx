import { useState } from 'react';
import { SearchPageContext } from './SearchPageContext';

import Main from '../../layouts/main/Main';

import PageHeading from '../../common/components/PageHeading';
import SearchForm from './components/search-form/SearchForm';
import Separator from './components/Separator';
import SearchResults from './components/search-results/SearchResults';

import { TEST_ID } from './utils/constants/testIds';

export default function SearchPage(): React.JSX.Element {
    const [isSubmitSuccessful, setIsSubmitSuccessful] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [page, headingContent] = ['search' as 'search', 'חיפוש נדל"ן:'];

    return (
        <SearchPageContext.Provider
            value={{
                isSubmitSuccessful,
                setIsSubmitSuccessful,
                isLoading,
                setIsLoading,
            }}
        >
            <Main page="search">
                <PageHeading page={page} content={headingContent} />
                <SearchForm id="real-estate-search-form" />
                {isSubmitSuccessful && (
                    <>
                        <Separator />
                        <SearchResults id="real-estate-output" />
                    </>
                )}
            </Main>
        </SearchPageContext.Provider>
    );
}
