import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <div>
          <p className="foot__brand">Northline Supply</p>
          <p className="foot__tag">
            Tools and gear chosen for how they hold up, not how they photograph.
          </p>
        </div>
        <nav className="foot__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/wishlist">Wishlist</Link>
        </nav>
      </div>
      <div className="foot__bottom">
        <span>© {new Date().getFullYear()} Northline Supply</span>
        <span>Built with React, React Router and Vite</span>
      </div>
    </footer>
  );
}
