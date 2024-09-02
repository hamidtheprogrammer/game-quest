import { reviewProp } from "../components/AddReview";
import { customError } from "./authApi";

export const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const addReview = async (review: reviewProp) => {
  const response = await fetch(`${serverUrl}/addreview/${review.productId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new customError(body.message, response.status, body);
    throw error;
  }

  return body;
};
