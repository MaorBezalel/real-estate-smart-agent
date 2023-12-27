import { useEffect } from 'react';

export default function usePageHide(callback: () => void): void {
    useEffect(() => {
        window.addEventListener('pagehide', callback);

        return () => window.removeEventListener('pagehide', callback);
    }, [callback]);
}
