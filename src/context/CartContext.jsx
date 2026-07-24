import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Shape: { [productId]: quantity }
  const [items, setItems] = useLocalStorage('nl.cart', {});

  const addItem = (id, qty = 1) =>
    setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));

  const decreaseItem = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const removeItem = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const clearCart = () => setItems({});

  const count = useMemo(
    () => Object.values(items).reduce((sum, qty) => sum + qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, decreaseItem, removeItem, clearCart, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
