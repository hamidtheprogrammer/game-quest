"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var reviewController_1 = require("../controllers/reviewController");
var auth_1 = require("../middlewares/auth");
var reviewRouter = (0, express_1.Router)();
reviewRouter.route("/addreview/:productId").post(auth_1.authenticate, reviewController_1.addReview);
exports.default = reviewRouter;
