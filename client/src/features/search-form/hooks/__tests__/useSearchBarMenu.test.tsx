import { renderHook, act, waitFor } from '@testing-library/react';
import useSearchBarMenu from '../useSearchBarMenu';

describe('useSearchBarMenu', () => {
    it('should open the filtered search menu when search bar is not empty', () => {
        // Arrange
        const { result } = renderHook(() => useSearchBarMenu(false, true));

        // Act
        act(() => {
            result.current.openFilteredSearchMenu();
        });

        // Assert
        expect(result.current.isFilteredSearchMenuOpen).toBe(true);
    });

    it('should not open the filtered search menu when search bar is empty', () => {
        // Arrange
        const { result } = renderHook(() => useSearchBarMenu(true, true));

        // Act
        act(() => {
            result.current.openFilteredSearchMenu();
        });

        // Assert
        expect(result.current.isFilteredSearchMenuOpen).toBe(false);
    });

    it('should close the filtered search menu after a delay', async () => {
        // Arrange
        const { result } = renderHook(() => useSearchBarMenu(false, true));

        // Act 1 - open the menu
        act(() => {
            result.current.openFilteredSearchMenu();
        });

        // Assert 1
        expect(result.current.isFilteredSearchMenuOpen).toBe(true);

        // Act 2 - close the menu
        act(() => {
            result.current.closeFilteredSearchMenu();
        });

        // Assert 2
        expect(result.current.isFilteredSearchMenuOpen).toBe(true);
        await waitFor(() => expect(result.current.isFilteredSearchMenuOpen).toBe(false), {
            timeout: 500,
        });
    });

    it('should close the filtered search menu when an option is selected', () => {
        // Arrange
        const setSearchBarValue = vitest.fn();
        const { result } = renderHook(() => useSearchBarMenu(false, true));

        // Act
        act(() => {
            result.current.handleSelectedOption('optionValue', setSearchBarValue);
        });

        // Assert
        expect(setSearchBarValue).toHaveBeenCalledWith('settlement', 'optionValue');
        expect(result.current.isFilteredSearchMenuOpen).toBe(false);
    });

    it('should response to search query changes', () => {
        // Arrange
        const { result } = renderHook(() => useSearchBarMenu(false, true));

        // Act 1 - empty search query
        act(() => {
            result.current.handleSearchQueryChange({
                target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        // Assert 1
        expect(result.current.isFilteredSearchMenuOpen).toBe(false);

        // Act 2 - non-empty search query
        act(() => {
            result.current.handleSearchQueryChange({
                target: { value: 'searchQuery' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        // Assert 2
        expect(result.current.isFilteredSearchMenuOpen).toBe(true);
    });
});
