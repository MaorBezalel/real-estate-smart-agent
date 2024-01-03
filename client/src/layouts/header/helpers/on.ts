/**
 * Attaches an event listener to the specified object.
 * 
 * @template T - The type of the object to attach the event listener to. Extends Window, Document, HTMLElement or EventTarget.
 * @param {T | null} obj - The object to attach the event listener to.
 * @param {Parameters<T['addEventListener']> | [string, Function | null, ...any]} args - The arguments to pass to the addEventListener function.
 * @returns {void}
 */
export function on<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
    if (obj && obj.addEventListener) {
        obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
    }
}