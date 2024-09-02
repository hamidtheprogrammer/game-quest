import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { customError } from "./authApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const createCheckoutSession = async () => {
  console.log(import.meta.env.STRIPE_PUBLIC_KEY);

  try {
    const stripe = await stripePromise;

    const response = await fetch(
      `${serverUrl}/checkout/create-checkout-session`,
      { method: "POST", credentials: "include" }
    );

    const session = await response.json();

    if (!response.ok) {
      const error = new customError(
        session.message || "Something went wrong",
        response.status,
        session
      );
      throw error;
    }

    const result = await (stripe as Stripe).redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(
        "Error redirecting to Stripe Checkout:",
        result.error.message
      );
    }
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};
