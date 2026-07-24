import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <Link to="/" className="nav__brand" onClick={close}>
        <span className="nav__mark" aria-hidden="true" />
        Northline<span className="nav__brandLight">Supply</span>
      </Link>

      <button
        className={`nav__burger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <nav className={`nav__links${open ? ' is-open' : ''}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/products" onClick={close}>Products</NavLink>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <NavLink to="/wishlist" onClick={close} className="nav__pillLink">
          Wishlist{ids.length > 0 && <span className="nav__badge">{ids.length}</span>}
        </NavLink>
        <NavLink to="/cart" onClick={close} className="nav__pillLink nav__pillLink--solid">
          Cart{count > 0 && <span className="nav__badge">{count}</span>}
        </NavLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}
