export const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A to Z' },
];

export function getCategories(products) {
    return ['All', ...Array.from(new Set(products.map((p) => p.category)))];
}

export function searchProducts(products, term) {
    const q = term.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
        (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
}

export function filterByCategory(products, category) {
    if (!category || category === 'All') return products;
    return products.filter((p) => p.category === category);
}

export function sortProducts(products, sortBy) {
    const list = [...products];
    switch (sortBy) {
        case 'price-asc':
            return list.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return list.sort((a, b) => b.price - a.price);
        case 'rating':
            return list.sort((a, b) => b.rating - a.rating);
        case 'name':
            return list.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return list;
    }
}

export function applyCatalogFilters(products, { search, category, sortBy }) {
    return sortProducts(
        searchProducts(filterByCategory(products, category), search || ''),
        sortBy
    );
}