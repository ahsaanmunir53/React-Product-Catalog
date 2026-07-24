import { Link } from 'react-router-dom';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getCategories } from '../utils/filterProducts';

export default function Home() {
  useDocumentTitle('Home');

  // Four highest-rated products act as the featured row.
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const categories = getCategories(products).filter((c) => c !== 'All');

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">Catalogue {new Date().getFullYear()} · {products.length} items in stock</p>
        <h1 className="hero__title">
          Gear that earns<br />its place in the bag.
        </h1>
        <p className="hero__lede">
          A short catalogue of audio, desk, carry and power equipment. Every entry lists the
          specification that actually decides the purchase, not the one that sells it.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--lg" to="/products">Browse the catalogue</Link>
          <Link className="btn btn--lg btn--outline" to="/about">How we choose</Link>
        </div>
        <dl className="hero__stats">
          <div><dt>Categories</dt><dd>{categories.length}</dd></div>
          <div><dt>Products</dt><dd>{products.length}</dd></div>
          <div><dt>Avg. rating</dt><dd>
            {(products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)}
          </dd></div>
        </dl>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Shop by category</h2>
        </div>
        <div className="cats">
          {categories.map((cat) => {
            const n = products.filter((p) => p.category === cat).length;
            const swatch = products.find((p) => p.category === cat).swatch;
            return (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="cats__item"
                style={{ '--swatch': swatch }}
              >
                <span className="cats__name">{cat}</span>
                <span className="cats__n">{n} items</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Highest rated</h2>
          <Link className="section__more" to="/products">View all →</Link>
        </div>
        <div className="grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
