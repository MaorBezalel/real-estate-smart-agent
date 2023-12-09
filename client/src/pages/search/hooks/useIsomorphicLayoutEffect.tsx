import { useEffect, useLayoutEffect } from 'react';

/**
 * An hook that provides an isomorphic version of the `useLayoutEffect` hook.
 * If the code is running on the client-side (in a browser environment), it uses `useLayoutEffect`.
 * If the code is running on the server-side (in a non-browser environment), it uses `useEffect`.
 * @returns The appropriate effect hook based on the runtime environment.
 */
export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;
