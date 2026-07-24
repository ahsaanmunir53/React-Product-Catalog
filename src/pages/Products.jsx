import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import allProducts from '../data/products.json';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortSelect from '../components/SortSelect';
import ProductList from '../components/ProductList';
import LoadMore from '../components/LoadMore';
import useDebounce from '../hooks/useDebounce';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { applyCatalogFilters, getCategories } from '../utils/filterProducts';

const PAGE_SIZE = 8;

export default function Products() {
  useDocumentTitle('Products');

  // Category can arrive from a link on the home page (?category=Audio).
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const debouncedSearch = useDebounce(search, 200);

  // Load the catalogue. A real build would fetch this; the timeout stands in
  // for the request so the loading state is exercised.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(() => {
      if (!cancelled) {
        setProducts(allProducts);
        setLoading(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Keep the category in the URL so filtered views can be shared.
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (category === 'All') next.delete('category');
    else next.set('category', category);
    setSearchParams(next, { replace: true });
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  // Any filter change starts the list from the first page again.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [debouncedSearch, category, sortBy]);

  const categories = useMemo(() => getCategories(allProducts), []);
  const counts = useMemo(() => {
    const map = { All: allProducts.length };
    allProducts.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(
    () => applyCatalogFilters(products, { search: debouncedSearch, category, sortBy }),
    [products, debouncedSearch, category, sortBy]
  );

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setSortBy('featured');
  };

  return (
    <section className="section section--top">
      <div className="section__head">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="section__title">All products</h1>
        </div>
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} resultCount={filtered.length} />
        <CategoryFilter
          categories={categories}
          active={category}
          onChange={setCategory}
          counts={counts}
        />
      </div>

      {loading ? (
        <div className="grid" aria-busy="true">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div className="skeleton" key={i} />
          ))}
        </div>
      ) : (
        <>
          <ProductList products={filtered.slice(0, visible)} onReset={resetFilters} />
          <LoadMore
            shown={Math.min(visible, filtered.length)}
            total={filtered.length}
            step={PAGE_SIZE}
            onLoadMore={() => setVisible((v) => v + PAGE_SIZE)}
          />
        </>
      )}
    </section>
  );
}
