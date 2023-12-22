import { renderHook } from '@testing-library/react';
import { SearchStateProvider } from '../../contexts';
import useSearchStateContext from '../useSearchStateContext';

describe('useSearchStateContext', () => {
    it('should return the search state context', () => {
        // Arrange
        const { result } = renderHook(() => useSearchStateContext(), {
            wrapper: ({ children }) => <SearchStateProvider>{children}</SearchStateProvider>,
        });

        // Assert
        expect(result.current).toBeTruthy();
    });

    it('should throw an error if used outside of the search state context', () => {
        // Arrange
        const errorMessage = 'useSearchStateContext must be used within a SearchStateContextProvider';

        // Assert
        expect(() => renderHook(() => useSearchStateContext())).toThrowError(errorMessage);
    });
});
