import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { createCheckoutSession } from "../controllers/orderController";

const orderRouter = Router();

orderRouter
  .route("/checkout/create-checkout-session")
  .post(authenticate, createCheckoutSession);

export default orderRouter;
