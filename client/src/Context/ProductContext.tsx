import { createContext, useEffect, useState } from "react";
import { productData } from "../protectedRoute/ManageProductData";
import React from "react";
import { props } from "./GlobalContext";
import { useQuery, useQueryClient } from "react-query";
import { getProducts } from "../apiClient/productApi";

export type queryProps = {
  pageNumber?: number;
  genre?: string[];
  age?: number | null;
  minPrice?: number;
  maxPrice?: number;
};

export interface paginationProps {
  pageNumber: number;
  total: number;
  gamesPerPage: number;
  pages: number;
}

export type productContextProp = {
  products: productData[];
  setProducts: (products: productData[]) => void;
  pagination: paginationProps;
  setPagination: (pagination: paginationProps) => void;
  query: queryProps;
  setQuery: (query: any) => void;
};

const defaultProductContext: productContextProp = {
  products: [],
  setProducts: () => {},
  query: { pageNumber: 1, genre: [], age: null, minPrice: 0, maxPrice: 1000 },
  setQuery: () => {},
  pagination: { pageNumber: 1, total: 0, gamesPerPage: 0, pages: 1 },
  setPagination: () => {},
};

export const ProductContext = createContext<productContextProp>(
  defaultProductContext
);

const ProductState: React.FC<props> = ({ children }) => {
  const [products, setProducts] = useState<productData[]>([]);
  const [pagination, setPagination] = useState<paginationProps>({
    pageNumber: 1,
    total: 0,
    gamesPerPage: 0,
    pages: 1,
  });
  const [query, setQuery] = useState<queryProps>({
    pageNumber: 1,
    genre: [],
    age: null,
    minPrice: 0,
    maxPrice: 1000,
  });
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["fetchProducts", query],
    queryFn: () => getProducts(query),
  });

  useEffect(() => {
    setProducts(data?.games);
    setPagination(data?.pagination);
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries("fetchProducts");
  }, [query]);
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        query,
        setQuery,
        pagination,
        setPagination,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
