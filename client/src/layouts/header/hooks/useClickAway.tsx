import { RefObject, useEffect, useRef } from 'react';
import { off, on } from '@layouts/header/helpers';

const defaultEvents = ['mousedown', 'touchstart'];

/**
 * Custom hook that detects clicks outside of a specified element.
 * @template E The type of event to listen for (defaults to Event).
 * @returns A ref object that should be attached to the element to track clicks outside of.
 */
const useClickAway = <E extends Event = Event>(
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: E) => void,
    events: string[] = defaultEvents
) => {
    const savedCallback = useRef(onClickAway);

    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);

    useEffect(() => {
        const handler = (event: E) => {
            const { current: el } = ref;
            el && !el.contains(event.target as Node) && savedCallback.current(event);
        };

        for (const eventName of events) {
            on(document, eventName, handler);
        }

        return () => {
            for (const eventName of events) {
                off(document, eventName, handler);
            }
        };
    }, [events, ref]);
};

export default useClickAway;
