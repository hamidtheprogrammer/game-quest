import { Router } from "express";
import {
  addToCart,
  getCart,
  removeItemFromCart,
  updateCart,
} from "../controllers/cartController";
import { authenticate } from "../middlewares/auth";

const cartRouter = Router();

cartRouter
  .route("/addtocart/:productId/:quantity")
  .post(authenticate, addToCart);
cartRouter.route("/getcart").get(authenticate, getCart);
cartRouter
  .route("/updatecart/:productId/:quantity")
  .put(authenticate, updateCart);
cartRouter
  .route("/removeitemfromcart/:productId")
  .delete(authenticate, removeItemFromCart);

export default cartRouter;
