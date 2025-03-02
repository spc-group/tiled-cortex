import { useState, useEffect } from "react";


export default function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    // Handler with a debounce delay
    useEffect(() => {
	const timeout = setTimeout(() => {
	    setDebouncedValue(value)
	}, delay);
	return () => clearTimeout(timeout);
    }, [value, delay]);
    return debouncedValue;
}
