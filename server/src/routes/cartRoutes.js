"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cartController_1 = require("../controllers/cartController");
var auth_1 = require("../middlewares/auth");
var cartRouter = (0, express_1.Router)();
cartRouter
    .route("/addtocart/:productId/:quantity")
    .post(auth_1.authenticate, cartController_1.addToCart);
cartRouter.route("/getcart").get(auth_1.authenticate, cartController_1.getCart);
cartRouter
    .route("/updatecart/:productId/:quantity")
    .put(auth_1.authenticate, cartController_1.updateCart);
cartRouter
    .route("/removeitemfromcart/:productId")
    .delete(auth_1.authenticate, cartController_1.removeItemFromCart);
exports.default = cartRouter;
