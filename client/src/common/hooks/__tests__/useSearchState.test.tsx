import { renderHook, act } from '@testing-library/react';
import useSearchState from '../useSearchState';

describe('useSearchState', () => {
    it('should initialize with the default value', () => {
        // Arrange
        const { result } = renderHook(() => useSearchState('active'));

        // Assert
        expect(result.current.value).toBe('active');
    });

    it('should initialize with the default value if no default value is provided', () => {
        // Arrange
        const defaultValue = 'inactive';
        const { result } = renderHook(() => useSearchState());

        // Assert
        expect(result.current.value).toBe(defaultValue);
    });

    describe('setValue', () => {
        it('should update the value', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act
            act(() => {
                result.current.setValue('active');
            });

            // Assert
            expect(result.current.value).toBe('active');
        });
    });

    describe('setToActive', () => {
        it('should update the value to active', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act
            act(() => {
                result.current.setToActive();
            });

            // Assert
            expect(result.current.value).toBe('active');
        });
    });

    describe('setToInactive', () => {
        it('should update the value to inactive', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act
            act(() => {
                result.current.setToInactive();
            });

            // Assert
            expect(result.current.value).toBe('inactive');
        });
    });

    describe('setToLoading', () => {
        it('should update the value to loading', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act
            act(() => {
                result.current.setToLoading();
            });

            // Assert
            expect(result.current.value).toBe('loading');
        });
    });

    describe('isActive', () => {
        it('should return true when the value is active', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState('active'));

            // Assert
            expect(result.current.isActive()).toBe(true);
        });

        it('should return false when the value is not active', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act 1 - inactive
            act(() => {
                result.current.setToInactive();
            });

            // Assert 1
            expect(result.current.isActive()).toBe(false);

            // Act 2 - loading
            act(() => {
                result.current.setToLoading();
            });

            // Assert 2
            expect(result.current.isActive()).toBe(false);
        });
    });

    describe('isInactive', () => {
        it('should return true when the value is inactive', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState('inactive'));

            // Assert
            expect(result.current.isInactive()).toBe(true);
        });

        it('should return false when the value is not inactive', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act 1 - active
            act(() => {
                result.current.setToActive();
            });

            // Assert 1
            expect(result.current.isInactive()).toBe(false);

            // Act 2 - loading
            act(() => {
                result.current.setToLoading();
            });

            // Assert 2
            expect(result.current.isInactive()).toBe(false);
        });
    });

    describe('isLoading', () => {
        it('should return true when the value is loading', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState('loading'));

            // Assert
            expect(result.current.isLoading()).toBe(true);
        });

        it('should return false when the value is not loading', () => {
            // Arrange
            const { result } = renderHook(() => useSearchState());

            // Act 1 - active
            act(() => {
                result.current.setToActive();
            });

            // Assert 1
            expect(result.current.isLoading()).toBe(false);

            // Act 2 - inactive
            act(() => {
                result.current.setToInactive();
            });

            // Assert 2
            expect(result.current.isLoading()).toBe(false);
        });
    });
});
