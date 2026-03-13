import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart([...cart, producto]);
  };

  // CAMBIO CLAVE: Ahora recibe el INDEX, no el ID
  const removeFromCart = (indexParaBorrar) => {
    setCart(cart.filter((_, index) => index !== indexParaBorrar));
  };

  const clearCart = () => setCart([]);

  // Aseguramos que el precio sea número para evitar errores en el total
  const total = cart.reduce((acc, item) => acc + Number(item.precio), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);