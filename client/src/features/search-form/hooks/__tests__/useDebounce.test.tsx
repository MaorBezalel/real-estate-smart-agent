import { renderHook, waitFor } from '@testing-library/react';

import useDebounce from '../useDebounce';

describe('useDebounce()', () => {
    describe('the hook itself', () => {
        beforeEach(() => {
            vitest.useRealTimers();
        });

        afterEach(() => {
            vitest.clearAllTimers();
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

        it('should debounce with default delay 500 ms', () => {
            // Arrange
            const defaultDelay = 500;
            mockSetTimeout();

            // Act
            renderHook(() => useDebounce('value'));

            // Assert
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), defaultDelay);
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

        const mockSetTimeout = () => {
            vitest.useFakeTimers();
            vitest.spyOn(global, 'setTimeout');
        };

        const mockClearTimeout = () => {
            vitest.useFakeTimers();
            vitest.spyOn(global, 'clearTimeout');
        };
    });

    describe('the debounce value', () => {
        it('should bounce the value accordance to the delay', async () => {
            // Arrange 1
            const delay = 1000; // 1
            const timeout = delay + 100;

            // Act 1
            const { result, rerender } = renderHook(() => useDebounce('value', delay));
            const debounceValue = result.current;

            // Assert 1
            expect(debounceValue).toBe('value');

            // --------------

            // Arrange 2
            const newValue = 'new value';

            // Act 2
            rerender({ value: newValue, delay });
            const newDebounceValue = result.current;

            // Assert 2
            expect(newDebounceValue).toBe(debounceValue);
            await waitFor(() => expect(result.current).toBe(newDebounceValue), { timeout });
        });
    });
});
