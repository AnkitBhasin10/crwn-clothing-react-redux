import { createContext, useEffect, useReducer, useState } from "react";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_OPEN: "SET_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type}`);
  }
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const updateCartItemsReducer = (newCartItems) => {
    console.log("hello");
    const newCount = newCartItems.reduce(
      (total, cartItems) => total + cartItems.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItems) => total + cartItems.price * cartItems.quantity,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCount,
      },
    });
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_OPEN,
      payload: isCartOpen,
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItems(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemsFromCart = (productToRemove) => {
    const newCartItems = removeCartItems(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearCartItem = (productToRemove) => {
    const newCartItems = clearCartItems(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
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
