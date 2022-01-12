import { Button } from "@mui/material";
import React from "react";
import { cartItemType } from "../App";
import { Wrapper } from "./CartItem.styles";

type props = {
  item: cartItemType;
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
};

export const CartItem: React.FC<props> = ({
  item,
  addToCart,
  removeFromCart,
}) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
};
