import { renderHook } from '@testing-library/react';
import usePageHide from '../usePageHide';

describe('usePageHide', () => {
    afterEach(() => {
        vitest.restoreAllMocks();
    });

    it('should add and remove event listener on mount and unmount', () => {
        // Arrange
        const addEventListenerSpy = vitest.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vitest.spyOn(window, 'removeEventListener');
        const callback = vitest.fn();

        // Act & Assert 1
        const { unmount } = renderHook(() => usePageHide(callback));
        expect(addEventListenerSpy).toHaveBeenCalledWith('pagehide', callback);
        expect(removeEventListenerSpy).not.toHaveBeenCalled();

        // Act & Assert 2
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('pagehide', callback);
    });
});
