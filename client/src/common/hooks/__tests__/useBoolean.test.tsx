import { act, renderHook } from '@testing-library/react';

import useBoolean from '../useBoolean';

describe('useBoolean()', () => {
    it('should use boolean', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean());

        // Assert
        expect(result.current.value).toBe(false);
        expect(typeof result.current.setTrue).toBe('function');
        expect(typeof result.current.setFalse).toBe('function');
        expect(typeof result.current.toggle).toBe('function');
        expect(typeof result.current.setValue).toBe('function');
    });

    it('should default value works (1)', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(true));

        // Assert
        expect(result.current.value).toBe(true);
    });

    it('should default value works (2)', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(false));

        // Assert
        expect(result.current.value).toBe(false);
    });

    it('should set to true (1)', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(false));

        // Act
        act(() => {
            result.current.setTrue();
        });

        // Assert
        expect(result.current.value).toBe(true);
    });

    it('should set to true (2)', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(false));

        // Act
        act(() => {
            result.current.setTrue();
            result.current.setTrue();
        });

        // Assert
        expect(result.current.value).toBe(true);
    });

    it('should set to false (1)', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(true));

        // Act
        act(() => {
            result.current.setFalse();
        });

        // Assert
        expect(result.current.value).toBe(false);
    });

    it('should set to false (2)', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(true));

        // Act
        act(() => {
            result.current.setFalse();
            result.current.setFalse();
        });

        // Assert
        expect(result.current.value).toBe(false);
    });

    it('should toggle value', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(true));

        // Act
        act(() => {
            result.current.toggle();
        });

        // Assert
        expect(result.current.value).toBe(false);
    });

    it('should toggle value from prev using setValue', () => {
        // Arrange
        const { result } = renderHook(() => useBoolean(true));

        // Act
        act(() => {
            result.current.setValue((x) => !x);
        });

        // Assert
        expect(result.current.value).toBe(false);
    });
});
