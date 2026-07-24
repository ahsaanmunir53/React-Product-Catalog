import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual';
import Rating from './Rating';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

/** One product tile. Everything it renders arrives through props. */
export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isSaved, toggleSaved } = useWishlist();
  const saved = isSaved(product.id);

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__link">
        <ProductVisual
          category={product.category}
          swatch={product.swatch}
          sku={product.sku}
          image={product.image}
          name={product.name}
        />
      </Link>

      <button
        className={`card__save${saved ? ' is-saved' : ''}`}
        onClick={() => toggleSaved(product.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      >
        {saved ? '♥' : '♡'}
      </button>

      <div className="card__body">
        <p className="card__cat">{product.category}</p>
        <h3 className="card__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="card__short">{product.short}</p>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="card__foot">
          <span className="card__price">{formatPrice(product.price)}</span>
          <button className="btn btn--sm" onClick={() => addItem(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
