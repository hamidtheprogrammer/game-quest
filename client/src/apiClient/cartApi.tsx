import { cartItemProps } from "../Context/CartFavouritesContext";
import { customError } from "./authApi";

export const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const getCart = async () => {
  const response = await fetch(`${serverUrl}/getcart`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};

export const addToCart = async (product: cartItemProps) => {
  const response = await fetch(
    `${serverUrl}/addtocart/${product.productId._id}/${
      product.quantity || "1"
    }`,
    {
      credentials: "include",
      method: "POST",
    }
  );

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(body.message, response.status, body);

    throw error;
  }

  return body;
};

export const updateCart = async (game: cartItemProps) => {
  const response = await fetch(
    `${serverUrl}/updatecart/${game.productId._id}/${game.quantity}`,
    {
      credentials: "include",
      method: "PUT",
    }
  );

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};

export const deleteFromCart = async (id: string) => {
  const response = await fetch(`${serverUrl}/removeitemfromcart/${id}`, {
    credentials: "include",
    method: "DELETE",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};
