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

  const handleAddToCart = (clickedItem: cartItemType): void => {
    setCartItems(() => {
      // is item already in the cart
      const isItemInCart: cartItemType | undefined = cartItems.find(
        (item) => item.id === clickedItem.id
      );
      if (isItemInCart) {
        return cartItems.map((item) => {
          if (item.id === clickedItem.id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
      }

      // first time item is added in the cart
      return [...cartItems, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number): void => {
    setCartItems(() => {
      return cartItems.reduce(
        (accumalator: cartItemType[], item: cartItemType) => {
          if (item.id === id) {
            if (item.amount === 1) {
              return accumalator;
            } else {
              return [...accumalator, { ...item, amount: item.amount - 1 }];
            }
          } else {
            return [...accumalator, item];
          }
        },
        [] as cartItemType[]
      );
    });
  };

  const getTotalItems = (cartItems: cartItemType[]): number => {
    let total: number = 0;
    cartItems.map((item) => {
      total = total + item.amount;
    });
    return total;
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
