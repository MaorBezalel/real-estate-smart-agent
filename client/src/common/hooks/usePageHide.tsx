import { useEffect } from 'react';

/**
 * A hook that executes a callback function when the page is either reloaded or unloaded.
 * @param {() => void} callback - A callback function to execute when the page is either reloaded or unloaded.
 * @returns {void}
 */
export default function usePageHide(callback: () => void): void {
    useEffect(() => {
        window.addEventListener('pagehide', callback);

        return () => window.removeEventListener('pagehide', callback);
    }, [callback]);
}
