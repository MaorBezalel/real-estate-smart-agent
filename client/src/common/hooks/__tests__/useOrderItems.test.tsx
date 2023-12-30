import { renderHook } from '@testing-library/react';
import useOrderItems from '../useOrderItems';
import * as ReactRouterDom from 'react-router-dom';

const mockedGetFn = vitest.fn();
vitest.mock('react-router-dom', async () => {
    const actual: typeof ReactRouterDom = await vitest.importActual('react-router-dom');

    return {
        ...actual,
        useSearchParams: () => {
            return [
                {
                    get: mockedGetFn,
                },
            ];
        },
    };
});

describe('useOrderItems', () => {
    const orderBy = [
        { id: '1', method: (items: number[]) => items.slice().sort((a, b) => a - b) },
        { id: '2', method: (items: number[]) => items.slice().sort((a, b) => b - a) },
    ];

    afterEach(() => {
        vitest.restoreAllMocks();
    });

    it('should return the ordered items based on the provided order ID', () => {
        // Arrange
        const items = [2, 1, 3];
        const expectedItems1 = [1, 2, 3];
        const expectedItems2 = [3, 2, 1];

        // Act & Assert 1
        const { result } = renderHook(() => useOrderItems(orderBy));
        mockedGetFn.mockReturnValueOnce('1');
        const orderedItems1 = result.current(items);
        expect(orderedItems1).toEqual(expectedItems1);
        expect(mockedGetFn).toHaveBeenCalledWith('orderId');

        // Act & Assert 2
        mockedGetFn.mockReturnValueOnce('2');
        const orderedItems2 = result.current(items);
        expect(orderedItems2).toEqual(expectedItems2);
        expect(mockedGetFn).toHaveBeenCalledWith('orderId');
    });

    it('should return the ordered items based on the first order ID if the provided order ID does not exist', () => {
        // Arrange
        const items = [3, 1, 2];
        const expectedItems = [1, 2, 3];

        // Act
        const { result } = renderHook(() => useOrderItems(orderBy));
        const orderedItems = result.current(items);

        // Assert
        expect(orderedItems).toEqual(expectedItems);
    });

    it('should return undefined if no items are provided', () => {
        // Arrange
        const items = undefined;

        // Act
        const { result } = renderHook(() => useOrderItems(orderBy));
        const orderedItems = result.current(items);

        // Assert
        expect(orderedItems).toBeUndefined();
    });
});
