import LinearProgress from "@mui/material/LinearProgress";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { AddShoppingCart, WrongLocation } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useQuery } from "react-query";
import { useState } from "react";
import { type } from "os";

//components
import { Item } from "./item/Item";
import { Cart } from "./cart/Cart";

//styles
import { StyledButton, Wrapper } from "./App.styles";

//types
export type cartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

/*-----------------------------------------------*/

// return type is a promise that resolves to the type in <>
const getProducts = async (): Promise<cartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

function App() {
  const { data, isLoading, isError } = useQuery<cartItemType[]>(
    "products",
    getProducts
  );

  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);

  if (isLoading) {
    return <LinearProgress></LinearProgress>;
  }
  if (isError) {
    return <div>sorry something went wrong</div>;
  }

  const handleAddToCart = (clickedItem: cartItemType): void => {};

  const handleRemoveFromCart = (id: number): void => {};

  const getTotalItems = (cartItems: cartItemType[]): number => {
    return 0;
  };

  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Wrapper>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCart></AddShoppingCart>
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map((item) => {
            return (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart}></Item>
              </Grid>
            );
          })}
        </Grid>
      </Wrapper>
    </>
  );
}

export default App;
