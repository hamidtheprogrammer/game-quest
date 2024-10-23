"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middlewares/auth");
var orderController_1 = require("../controllers/orderController");
var orderRouter = (0, express_1.Router)();
orderRouter
    .route("/checkout/create-checkout-session")
    .post(auth_1.authenticate, orderController_1.createCheckoutSession);
exports.default = orderRouter;
