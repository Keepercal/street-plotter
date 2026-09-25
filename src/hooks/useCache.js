import { useRef } from 'react';

export default function useCache() {
	const cache = useRef(new Map());

	function get(key) {
		return cache.current.get(key);
	}

	function set(key, value) {
		cache.current.set(key, value);
	}

	function has(key) {
		return cache.current.has(key);
	}

	function entries() {
		return Array.from(cache.current.entries());
	}

	function remove(key) {
		cache.current.delete(key);
	}

	function clear() {
		cache.current.clear;
	}

	return {
		get,
		set,
		has,
		entries,
		remove,
		clear,
	};
}
