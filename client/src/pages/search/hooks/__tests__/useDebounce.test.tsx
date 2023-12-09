import { renderHook } from '@testing-library/react';

import { useDebounce } from '..';

describe('useDebounce()', () => {
    afterEach(() => {
        vitest.useRealTimers();
    });

    it('should return debounce value', () => {
        // Arrange
        const value = 'value';

        // Act
        const {
            result: { current: debounceValue },
        } = renderHook(() => useDebounce(value));

        // Assert
        expect(value).toBe(debounceValue);
    });

    it('should debounce with default debounce 500 ms', () => {
        // Arrange
        mockSetTimeout();

        // Act
        renderHook(() => useDebounce('value'));

        // Assert
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    });

    it('should debounce with given debounce', () => {
        // Arrange
        mockSetTimeout();

        // Act
        renderHook(() => useDebounce('value', 1337));

        // Assert
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1337);
    });

    it('should call clearTimeout on unmount', () => {
        // Arrange
        mockClearTimeout();
        const { unmount } = renderHook(() => useDebounce('value'));

        // Act
        unmount();

        // Assert
        expect(clearTimeout).toHaveBeenCalledTimes(1);
    });
});

const mockSetTimeout = () => {
    vitest.useFakeTimers();
    vitest.spyOn(global, 'setTimeout');
};

const mockClearTimeout = () => {
    vitest.useFakeTimers();
    vitest.spyOn(global, 'clearTimeout');
};
