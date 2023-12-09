import { useEffect } from 'react';

/**
 * Executes a callback function when the component is unmounted.
 * @param effect - The callback function to be executed on unmount.
 */
export default function useOnUnmount(effect: () => void): void {
    useEffect(() => {
        return effect;
    }, []);
}
