import { queryProps } from "../Context/ProductContext";
import { customError, serverUrl } from "./authApi";

export const getProducts = async (query: queryProps) => {
  const queryParams = new URLSearchParams();
  if (query.pageNumber)
    queryParams.append("pageNumber", query.pageNumber.toString() || "1");
  if (query.genre && query.genre.length)
    queryParams.append("genre", query.genre.join("_") || "");
  if (query.age) queryParams.append("age", query.age.toString() || "");
  if (query.minPrice)
    queryParams.append("minPrice", query.minPrice.toString() || "0");
  if (query.maxPrice)
    queryParams.append("maxPrice", query.maxPrice.toString() || "1000");

  const response = await fetch(`${serverUrl}/get-products?${queryParams}`, {
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.message || "Something went wrong",
      response.status,
      body
    );
    throw error;
  }

  return body;
};

export const getProductById = async (productId: string) => {
  const response = await fetch(`${serverUrl}/get-product/${productId}`, {
    method: "POST",
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.message || "Something went wrong",
      response.status,
      body
    );
    throw error;
  }

  return body;
};

export const getHomePageProducts = async () => {
  const response = await fetch(`${serverUrl}/gethomepageproducts`, {
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.message || "Something went wrong",
      response.status,
      body
    );
    throw error;
  }

  return body;
};
