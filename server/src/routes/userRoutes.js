"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userControllers_1 = require("../controllers/userControllers");
var validateUser_1 = require("../middlewares/validateUser");
var auth_1 = require("../middlewares/auth");
var userRouter = (0, express_1.Router)();
userRouter.route("/register").post((0, validateUser_1.validationRules)({}), validateUser_1.validate, userControllers_1.registerUser);
// userRouter
//   .route("/login")
//   .post(validationRules({ login: true }), validate, loginUser);
userRouter.route("/login").post(userControllers_1.loginUser);
userRouter.route("/verify-token").get(auth_1.verifyToken);
userRouter.route("/get-profile").get(auth_1.authenticate, userControllers_1.getCurrentUserProfile);
userRouter
    .route("/update-profile")
    .post(auth_1.authenticate, (0, validateUser_1.validationRules)({ updateProfile: true }), validateUser_1.validate, userControllers_1.updateCurrentUserProfile);
userRouter.route("/delete-profile").get(auth_1.authenticate, userControllers_1.deleteCurrentUserProfile);
userRouter.route("/logout").post(userControllers_1.logout);
exports.default = userRouter;
