import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import ProductVisual from '../components/ProductVisual';
import ProductCard from '../components/ProductCard';
import Rating from '../components/Rating';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isSaved, toggleSaved } = useWishlist();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const found = products.find((p) => String(p.id) === String(id));
    setProduct(found || null);
    setNotFound(!found);
    setQty(1);
    setAdded(false);
    if (found) document.title = `${found.name} | Northline Supply`;
  }, [id]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  if (notFound) {
    return (
      <section className="section section--top detail__missing">
        <p className="eyebrow">404</p>
        <h1 className="section__title">That product is not in the catalogue</h1>
        <p className="detail__missingBody">
          Product #{id} does not exist. It may have been removed, or the link may be wrong.
        </p>
        <Link className="btn" to="/products">Back to all products</Link>
      </section>
    );
  }

  if (!product) return <div className="section section--top">Loading…</div>;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  const saved = isSaved(product.id);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
  };

  return (
    <section className="section section--top">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/products">Products</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="detail">
        <div className="detail__media">
          <ProductVisual
            category={product.category}
            swatch={product.swatch}
            sku={product.sku}
            image={product.image}
            name={product.name}
          />
        </div>

        <div className="detail__info">
          <p className="eyebrow">{product.category}</p>
          <h1 className="detail__title">{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} size="lg" />
          <p className="detail__price">{formatPrice(product.price)}</p>
          <p className="detail__desc">{product.description}</p>

          <ul className="detail__features">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <p className={`detail__stock${product.stock < 10 ? ' is-low' : ''}`}>
            {product.stock < 10
              ? `Only ${product.stock} left in stock`
              : `In stock · ${product.stock} available`}
          </p>

          <div className="detail__buy">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn btn--lg" onClick={handleAdd}>
              {added ? 'Added to cart ✓' : 'Add to cart'}
            </button>
            <button
              className={`btn btn--outline btn--lg${saved ? ' is-saved' : ''}`}
              onClick={() => toggleSaved(product.id)}
            >
              {saved ? '♥ Saved' : '♡ Save'}
            </button>
          </div>

          <table className="specs">
            <caption>Specification</caption>
            <tbody>
              {Object.entries(product.specs).map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">SKU</th>
                <td>{product.sku}</td>
              </tr>
            </tbody>
          </table>

          <button className="linkback" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="section__sub">
          <h2 className="section__title">More in {product.category}</h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
