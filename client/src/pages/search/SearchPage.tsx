import { useState, useEffect } from 'react';
import { SearchPageContext } from './SearchPageContext';

import Heading from './components/Heading';
import SearchForm from './components/search-form/SearchForm';
import Separator from './components/Separator';
import SearchResults from './components/search-results/SearchResults';

import './assets/animations/loading.css';

export default function SearchPage(): React.JSX.Element {
    const [isSubmitSuccessful, setIsSubmitSuccessful] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <SearchPageContext.Provider
            value={{
                isSubmitSuccessful,
                setIsSubmitSuccessful,
                isLoading,
                setIsLoading,
            }}
        >
            <main
                className="container mx-auto flex flex-1 flex-col place-items-center gap-4 px-4 pt-4
                mobile-md:gap-6
                tablet-sm:gap-7
                laptop-md:gap-10"
            >
                <Heading />
                <SearchForm id="real-estate-search-form" />
                {isSubmitSuccessful && (
                    <>
                        <Separator />
                        <SearchResults id="real-estate-output" />
                    </>
                )}
            </main>
        </SearchPageContext.Provider>
    );
}
