import { Router } from "express";
import {
  getAllProducts,
  getHomePageProducts,
  getProductById,
} from "../controllers/productController";

const productRouter = Router();

productRouter.route("/get-products").get(getAllProducts);
productRouter.route("/gethomepageproducts").get(getHomePageProducts);
productRouter.route("/get-product/:productId").post(getProductById);

export default productRouter;
