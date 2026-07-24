import { useState, useEffect } from 'react';

/** Delays a fast-changing value (like a search box) by `delay` ms. */
export default function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
