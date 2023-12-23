import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * A hook that executes a callback function after a specified delay.
 * @param {() => void} callback - The callback function to be executed.
 * @param {number | null} delay - The delay in milliseconds before executing the callback.
 */
export default function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the timeout.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return;
        }

        const id = setTimeout(() => savedCallback.current(), delay);

        return () => clearTimeout(id);
    }, [delay]);
}
