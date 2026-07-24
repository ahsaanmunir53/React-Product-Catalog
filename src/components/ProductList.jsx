import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

/** Renders the grid, or an empty state when nothing matches. */
export default function ProductList({ products, onReset }) {
  if (!products.length) {
    return (
      <EmptyState
        title="No products match those filters"
        body="Try a different search term, or clear the filters to see the full catalogue."
        actionLabel="Clear filters"
        onAction={onReset}
      />
    );
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
