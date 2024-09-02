import { customError } from "./authApi";

export const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const getFavourites = async () => {
  const response = await fetch(`${serverUrl}/getfavourites`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};

export const addToFavourites = async (productId: string) => {
  const response = await fetch(`${serverUrl}/addtofavourites/${productId}`, {
    method: "POST",
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(body.message, response.status, body);

    throw error;
  }

  return body;
};

export const deleteFromFavourites = async (productId: string) => {
  const response = await fetch(
    `${serverUrl}/removefromfavourites/${productId}`,
    {
      credentials: "include",
      method: "DELETE",
    }
  );

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};
