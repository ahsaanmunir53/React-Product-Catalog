/**
 * Pure catalog logic, kept out of the components so it can be reasoned
 * about (and unit tested) on its own.
 */

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A to Z' },
];

/** Unique category list with "All" first, derived from the data itself. */
export function getCategories(products) {
  return ['All', ...Array.from(new Set(products.map((p) => p.category)))];
}

/** Case-insensitive match on product name (and its one-line summary). */
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
  const list = [...products]; // never mutate the source array
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

/** Single entry point used by the Products page. */
export function applyCatalogFilters(products, { search, category, sortBy }) {
  return sortProducts(
    searchProducts(filterByCategory(products, category), search || ''),
    sortBy
  );
}
