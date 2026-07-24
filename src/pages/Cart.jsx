import { Link } from 'react-router-dom';
import products from '../data/products.json';
import EmptyState from '../components/EmptyState';
import ProductVisual from '../components/ProductVisual';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

const SHIPPING = 250;
const FREE_OVER = 20000;

export default function Cart() {
  useDocumentTitle('Cart');
  const { items, addItem, decreaseItem, removeItem, clearCart } = useCart();

  const lines = Object.entries(items)
    .map(([id, qty]) => ({ product: products.find((p) => String(p.id) === id), qty }))
    .filter((l) => l.product);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_OVER ? 0 : SHIPPING;

  if (!lines.length) {
    return (
      <section className="section section--top">
        <p className="eyebrow">Cart</p>
        <h1 className="section__title">Your cart</h1>
        <EmptyState
          title="Your cart is empty"
          body="Nothing added yet. The catalogue is a good place to start."
        />
        <p style={{ marginTop: '2rem' }}>
          <Link className="btn" to="/products">Browse products</Link>
        </p>
      </section>
    );
  }

  return (
    <section className="section section--top">
      <p className="eyebrow">Cart</p>
      <h1 className="section__title">Your cart</h1>

      <div className="cartlayout">
        <div className="cartlines">
          {lines.map(({ product, qty }) => (
            <div className="line" key={product.id}>
              <div className="line__media">
                <ProductVisual category={product.category} swatch={product.swatch} sku={product.sku} />
              </div>
              <div className="line__info">
                <Link className="line__name" to={`/product/${product.id}`}>{product.name}</Link>
                <p className="line__meta">{product.category} · {formatPrice(product.price)} each</p>
                <button className="line__remove" onClick={() => removeItem(product.id)}>Remove</button>
              </div>
              <div className="qty">
                <button onClick={() => decreaseItem(product.id)} aria-label={`Fewer ${product.name}`}>−</button>
                <span>{qty}</span>
                <button onClick={() => addItem(product.id)} aria-label={`More ${product.name}`}>+</button>
              </div>
              <p className="line__total">{formatPrice(product.price * qty)}</p>
            </div>
          ))}
          <button className="btn btn--outline btn--sm" onClick={clearCart}>Clear cart</button>
        </div>

        <aside className="summary">
          <h2 className="summary__title">Summary</h2>
          <div className="summary__row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="summary__note">
              Free shipping over {formatPrice(FREE_OVER)} — add {formatPrice(FREE_OVER - subtotal)} more.
            </p>
          )}
          <div className="summary__row summary__row--total">
            <span>Total</span><span>{formatPrice(subtotal + shipping)}</span>
          </div>
          <button className="btn btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
            Checkout
          </button>
          <p className="summary__fine">
            Checkout is not wired up in this build — this is a front-end catalogue project.
          </p>
        </aside>
      </div>
    </section>
  );
}
