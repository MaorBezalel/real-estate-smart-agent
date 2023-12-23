import { useEffect, useState } from 'react';

/**
 * Debounces a value for a specified delay.
 * @template T The type of the value being debounced.
 * @param {T} value The value to debounce.
 * @param {number} [delay=500] The delay in milliseconds to debounce the value.
 * @returns {T} The debounced value.
 * @example
 * const [value, setValue] = useState<string>(''); // value === ''
 * const debouncedValue = useDebounce<string>(value, 500); // debouncedValue === ''
 * setValue('a'); // value === 'a'
 * // ************ 500ms later ************ \\
 * setDebouncedValue('a'); // debouncedValue === 'a'
 */
export default function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
