import { act, renderHook } from '@testing-library/react';

import { useTimeout } from '..';

describe('useTimeout()', () => {
    it('should call the callback after 1 min', () => {
        // Arrange
        const delay = 1000 * 60; // 1 min
        const callback = vitest.fn();
        vitest.useFakeTimers();

        // Act
        renderHook(() => useTimeout(callback, delay));

        // Assert
        expect(callback).not.toHaveBeenCalled();

        // Act
        act(() => {
            vitest.advanceTimersByTime(delay);
        });

        // Assert
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not do anything if "delay" is null', () => {
        // Arrange
        const delay = null;
        const callback = vitest.fn();
        vitest.useFakeTimers();

        // Act
        renderHook(() => useTimeout(callback, delay));

        // Assert
        expect(callback).not.toHaveBeenCalled();

        // Act
        act(() => {
            vitest.runAllTimers();
        });

        // Assert
        expect(callback).not.toHaveBeenCalled();
    });
});
