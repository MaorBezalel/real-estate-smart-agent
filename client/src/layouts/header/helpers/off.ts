/**
 * Removes an event listener from a given object.
 * 
 * @template T - The type of the object to remove the event listener from. Extends Window, Document, HTMLElement or EventTarget.
 * @param {T | null} obj - The object to remove the event listener from.
 * @param {Parameters<T['removeEventListener']> | [string, Function | null, ...any]} args - The arguments to pass to the removeEventListener function.
 */
export function off<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
    }
}
