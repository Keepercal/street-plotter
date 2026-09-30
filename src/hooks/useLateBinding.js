import { useRef, useCallback } from 'react';

/**
 * Returns a stable function whose implementation can be
 * bound later via `bind`.
 *
 * Useful for breaking circular dependencies between hooks
 * that need each other's return values.
 *
 * IMPORTANT: Call `bind` inside a useEffect, never during render.
 * The ref must not be written synchronously during render.
 */
export default function useLateBinding() {
	const ref = useRef(() => {});

	const stableFn = useCallback((...args) => ref.current(...args), []);

	const bind = useCallback((fn) => {
		ref.current = fn;
	}, []);

	return [stableFn, bind];
}
