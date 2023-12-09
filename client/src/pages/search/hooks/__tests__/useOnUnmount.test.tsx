import { renderHook } from '@testing-library/react';

import useOnUnmount from '../useOnUnmount';

describe('useOnUnmount()', () => {
    it('should execute the callback function on unmount', () => {
        // Arrange
        const effect = vitest.fn();

        // Act
        const { unmount } = renderHook(() => useOnUnmount(effect));

        // Assert
        expect(effect).not.toHaveBeenCalled();

        // Act
        unmount();

        // Assert
        expect(effect).toHaveBeenCalled();
    });
});
