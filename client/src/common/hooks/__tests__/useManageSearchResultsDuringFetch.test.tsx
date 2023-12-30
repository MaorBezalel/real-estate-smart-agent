import { renderHook } from '@testing-library/react';
import useManageSearchResultsDuringFetch from '../useManageSearchResultsDuringFetch';
import * as CustomHooks from '@common/hooks';

describe('useManageSearchResultsDuringFetch', () => {
    const setToActiveSpyFn = vitest.fn();
    const setErrorHadOccurredSpyFn = vitest.fn();
    const setErrorHadNotOccurredSpyFn = vitest.fn();

    afterEach(() => {
        vitest.clearAllMocks();
    });

    it('should set `hasErrorOccurredBeforeSuccess` to `false` if `isSearch.inactive` is `true`', () => {
        // Arrange
        const isQuery = { loading: false, error: false, success: false };
        const isSearch = { inactive: true };
        const setSearchTo = { active: setToActiveSpyFn };
        vitest.spyOn(CustomHooks, 'useBoolean').mockReturnValueOnce({
            value: true,
            setTrue: setErrorHadOccurredSpyFn,
            setFalse: setErrorHadNotOccurredSpyFn,
            setValue: vitest.fn(),
            toggle: vitest.fn(),
        });

        // Act
        renderHook(() => useManageSearchResultsDuringFetch({ isQuery, isSearch, setSearchTo }));

        // Assert
        expect(setErrorHadOccurredSpyFn).not.toHaveBeenCalled();
        expect(setErrorHadNotOccurredSpyFn).toHaveBeenCalled();
    });

    it('should set `hasErrorOccurredBeforeSuccess` to `false` and call `setSearchTo.active` if `isQuery.success` is `true` and `isSearch.inactive` is `false`', () => {
        // Arrange
        const isQuery = { loading: false, error: false, success: true };
        const isSearch = { inactive: false };
        const setSearchTo = { active: setToActiveSpyFn };
        vitest.spyOn(CustomHooks, 'useBoolean').mockReturnValueOnce({
            value: true,
            setTrue: setErrorHadOccurredSpyFn,
            setFalse: setErrorHadNotOccurredSpyFn,
            setValue: vitest.fn(),
            toggle: vitest.fn(),
        });

        // Act
        renderHook(() => useManageSearchResultsDuringFetch({ isQuery, isSearch, setSearchTo }));

        // Assert
        expect(setErrorHadOccurredSpyFn).not.toHaveBeenCalled();
        expect(setErrorHadNotOccurredSpyFn).toHaveBeenCalled();
        expect(setToActiveSpyFn).toHaveBeenCalled();
    });

    it('should set `hasErrorOccurredBeforeSuccess` to `true` and call `setSearchTo.active` if `isQuery.error` is `true` and `isSearch.inactive` is `false`', () => {
        // Arrange
        const isQuery = { loading: false, error: true, success: false };
        const isSearch = { inactive: false };
        const setSearchTo = { active: setToActiveSpyFn };
        vitest.spyOn(CustomHooks, 'useBoolean').mockReturnValueOnce({
            value: true,
            setTrue: setErrorHadOccurredSpyFn,
            setFalse: setErrorHadNotOccurredSpyFn,
            setValue: vitest.fn(),
            toggle: vitest.fn(),
        });

        // Act
        renderHook(() => useManageSearchResultsDuringFetch({ isQuery, isSearch, setSearchTo }));

        // Assert
        expect(setErrorHadOccurredSpyFn).toHaveBeenCalled();
        expect(setErrorHadNotOccurredSpyFn).not.toHaveBeenCalled();
        expect(setToActiveSpyFn).toHaveBeenCalled();
    });
});
