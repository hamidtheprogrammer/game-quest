import { productData } from "../protectedRoute/AddProduct";
import { customError } from "./authApi";

const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllusers = async () => {
  const response = await fetch(`${serverUrl}/get-users`, {
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

export const addProduct = async (data: FormData) => {
  const response = await fetch(`${serverUrl}/add-product`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(
      body.message || "something went wrong",
      response.status,
      body
    );
    throw error;
  }

  return body;
};

export const updateProduct = async (data: productData) => {
  console.log(data.get("_id"));

  const response = await fetch(
    `${serverUrl}/update-product/${data.get("_id")}`,
    {
      method: "PUT",
      body: data,
      credentials: "include",
    }
  );

  const body = await response.json();

  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};
