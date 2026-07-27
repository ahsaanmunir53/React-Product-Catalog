import { useEffect } from 'react';

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `${title} | Northline Supply`;
    }, [title]);
}