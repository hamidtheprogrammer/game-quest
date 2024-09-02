import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { productData } from "../protectedRoute/ManageProductData";
import { useQuery } from "react-query";
import * as favouritesApi from "../apiClient/favouritesApi";
import * as cartApi from "../apiClient/cartApi";

type props = {
  children: ReactNode;
};

export interface cartItemProps {
  productId: productData;
  quantity?: number;
}

export type cartFavouritesProps = {
  favourites: { productId: productData }[];
  setFavourites: (favourites: cartFavouritesProps["favourites"]) => void;
  cart: cartItemProps[];
  setCart: (cart: cartItemProps[]) => void;
};

const defaultContext: cartFavouritesProps = {
  favourites: [],
  setFavourites: () => {},
  cart: [],
  setCart: () => {},
};

export const CartFavouritesContext = createContext(defaultContext);

const CartFavouritesState: React.FC<props> = ({ children }) => {
  const [favourites, setFavourites] = useState<
    cartFavouritesProps["favourites"]
  >([]);
  const [cart, setCart] = useState<cartItemProps[]>([]);

  const { data } = useQuery({
    queryFn: cartApi.getCart,
    queryKey: ["get-cart"],
  });

  const { data: favouritesData } = useQuery({
    queryFn: favouritesApi.getFavourites,
    queryKey: ["get-favourites"],
  });

  useEffect(() => {
    favouritesData && setFavourites(favouritesData.items);
  }, [favouritesData]);

  useEffect(() => {
    data && setCart(data.items);
  }, [data]);

  return (
    <CartFavouritesContext.Provider
      value={{ favourites, setFavourites, cart, setCart }}
    >
      {children}
    </CartFavouritesContext.Provider>
  );
};

export default CartFavouritesState;
