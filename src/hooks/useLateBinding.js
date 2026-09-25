import { useRef, useCallback } from 'react';

/**
 * useLateBinding
 * ---------------
 * Returns a stable function that can be called immediately, even
 * though the "real" function it should call doesn't exist yet.
 * Bind the real function once it becomes available via `bind`.
 *
 * Useful for breaking circular dependencies between hooks that
 * each need the other's return value (e.g. useWorkspaceActions
 * needs setProject from useProjectManager, but useProjectManager
 * needs resetWorkspace from useWorkspaceActions).
 *
 * IMPORTANT: call `bind` inside a useEffect, never during render —
 * refs must not be written synchronously in the render body.
 */

export default function useLateBinding() {
	const ref = useRef(() => {});

	const stableFn = useCallback((...args) => ref.current(...args), []);

	const bind = useCallback((fn) => {
		ref.current = fn;
	}, []);

	return [stableFn, bind];
}
