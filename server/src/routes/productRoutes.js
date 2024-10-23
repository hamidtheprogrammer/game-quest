"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productController_1 = require("../controllers/productController");
var productRouter = (0, express_1.Router)();
productRouter.route("/get-products").get(productController_1.getAllProducts);
productRouter.route("/gethomepageproducts").get(productController_1.getHomePageProducts);
productRouter.route("/get-product/:productId").post(productController_1.getProductById);
exports.default = productRouter;
