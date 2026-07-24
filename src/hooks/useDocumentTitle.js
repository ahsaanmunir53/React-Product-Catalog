import { useEffect } from 'react';

/** Keeps the browser tab title in step with the current route. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | Northline Supply`;
  }, [title]);
}
