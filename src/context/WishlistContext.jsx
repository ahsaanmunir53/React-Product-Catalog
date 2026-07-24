import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('nl.wishlist', []);

  const isSaved = (id) => ids.includes(id);

  const toggleSaved = (id) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <WishlistContext.Provider value={{ ids, isSaved, toggleSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
