import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pizza, qty) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x.pizza._id === pizza._id);
      if (existItem) {
        return prev.map(x => 
          x.pizza._id === existItem.pizza._id ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        return [...prev, { pizza, qty }];
      }
    });
  };

  const updateQty = (id, qty) => {
    setCartItems(prev => prev.map(x => x.pizza._id === id ? { ...x, qty } : x));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(x => x.pizza._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.qty * item.pizza.price, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// State Sync: Encapsulated localStorage writes within throttled effect listeners.