import { useState, ChangeEvent } from 'react';
import { useBoolean, useOnUnmount } from '../../../common/hooks';

import { UseFormSetValue } from 'react-hook-form';
import { FormDataInputs } from '..';

type UseSearchBarMenuResult = {
    isFilteredSearchMenuOpen: boolean;
    openFilteredSearchMenu: () => void;
    closeFilteredSearchMenu: () => void;
    handleSelectedOption: (
        selectedOptionValue: string,
        setSearchBarValue: UseFormSetValue<FormDataInputs>
    ) => void;
    handleSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A hook which serves as an abstraction layer for the search bar menu functionality.
 *
 * @param {boolean} isSearchBarEmpty - Whether the search bar is empty or not.
 * @param {boolean} areThereAnyFilteredSearchResults - Whether there are any filtered search results or not.
 * @returns {UseSearchBarMenuResult} - The search bar menu functionality.
 */
export default function useSearchBarMenu(
    isSearchBarEmpty: boolean,
    areThereAnyFilteredSearchResults: boolean
): UseSearchBarMenuResult {
    const {
        value: canDisplayFilteredSearchMenu,
        setTrue: displayFilteredSearchMenu,
        setFalse: hideFilteredSearchMenu,
    } = useBoolean(false);
    const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);

    useOnUnmount(() => {
        if (menuTimeout) clearTimeout(menuTimeout);
    });

    const isFilteredSearchMenuOpen: boolean =
        canDisplayFilteredSearchMenu && !isSearchBarEmpty && areThereAnyFilteredSearchResults;

    const openFilteredSearchMenu = () => {
        if (isSearchBarEmpty) return;
        displayFilteredSearchMenu();
    };

    const closeFilteredSearchMenu = () => {
        setMenuTimeout(setTimeout(() => hideFilteredSearchMenu(), 100));
    };

    const handleSelectedOption = (
        selectedOptionValue: string,
        setSearchBarValue: UseFormSetValue<FormDataInputs>
    ) => {
        if (menuTimeout) clearTimeout(menuTimeout); // clear the timeout to prevent the menu from closing
        setSearchBarValue('settlement', selectedOptionValue);
        hideFilteredSearchMenu();
    };

    const handleSearchQueryChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        if (!value) hideFilteredSearchMenu();
        else if (!canDisplayFilteredSearchMenu) {
            // to avoid unnecessary re-assigment of the same value
            displayFilteredSearchMenu();
        }
    };

    return {
        isFilteredSearchMenuOpen,
        openFilteredSearchMenu,
        closeFilteredSearchMenu,
        handleSelectedOption,
        handleSearchQueryChange,
    };
}
