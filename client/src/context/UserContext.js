import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    displayName: "",
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.productId === product.productId
    );
    const updatedCart = [...cartItems];
    if (existingProductIndex >= 0) {
      updatedCart[existingProductIndex].quantity += product.quantity;
    } else {
      updatedCart.push(product);
    }
    updateCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    updateCart(updatedCart);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, cartItems, addToCart, removeFromCart }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
