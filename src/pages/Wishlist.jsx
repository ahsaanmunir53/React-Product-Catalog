import { Link } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  useDocumentTitle('Wishlist');
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <section className="section section--top">
      <p className="eyebrow">Saved</p>
      <h1 className="section__title">Your wishlist</h1>

      {saved.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          body="Tap the heart on any product to keep it here. The list survives a refresh."
        />
      ) : (
        <>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>
            {saved.length} {saved.length === 1 ? 'product' : 'products'} saved.
          </p>
          <div className="grid">
            {saved.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}

      <p style={{ marginTop: '2rem' }}>
        <Link className="btn btn--outline" to="/products">Back to catalogue</Link>
      </p>
    </section>
  );
}
