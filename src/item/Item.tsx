import { Button } from "@mui/material";
import React from "react";

//types
import { cartItemType } from "../App";

//styles
import { Wrapper } from "./Item.styles";

type props = {
  item: cartItemType;
  handleAddToCart: (clickedItem: cartItemType) => void;
};

export const Item: React.FC<props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  );
};
