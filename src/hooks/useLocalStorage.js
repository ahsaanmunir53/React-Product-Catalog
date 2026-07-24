import { useState, useEffect } from 'react';

/**
 * useState that survives a page refresh.
 * Reads once on mount and writes back whenever the value changes.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // Private mode or blocked storage: fall back to memory only.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable - keep the value in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
