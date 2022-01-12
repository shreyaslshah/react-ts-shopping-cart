import { CartItem } from "../cartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { cartItemType } from "../App";
import { type } from "os";
import React from "react";

type props = {
  cartItems: cartItemType[];
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
};

export const Cart: React.FC<props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items In Your Cart</p> : null}
      {cartItems.map((item) => {
        return <CartItem></CartItem>;
      })}
    </Wrapper>
  );
};
