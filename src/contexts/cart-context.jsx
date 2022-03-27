import { createContext, useEffect, useState } from "react";

const addCartItems = (cartItems, productToAdd) => {
  const existingProductInCart = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingProductInCart) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItems = (cartItems, productToRemove) => {
  const existingProductInCart = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingProductInCart.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItems = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: null,
  removeItemsFromCart: () => {},
  clearCartItem: () => {},
  cartTotal: null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce(
      (total, cartItems) => total + cartItems.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItems) => total + cartItems.price * cartItems.quantity,
      0
    );

    setCartCount(newCount);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd));
  };

  const removeItemsFromCart = (productToRemove) => {
    setCartItems(removeCartItems(cartItems, productToRemove));
  };

  const clearCartItem = (productToRemove) => {
    setCartItems(clearCartItems(cartItems, productToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemsFromCart,
    clearCartItem,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
