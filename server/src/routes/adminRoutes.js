"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var adminController_1 = require("../controllers/adminController");
var auth_1 = require("../middlewares/auth");
var validateProduct_1 = require("../middlewares/validateProduct");
var multer_1 = require("multer");
var adminRouter = (0, express_1.Router)();
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
adminRouter.route("/get-users").post(auth_1.authenticate, adminController_1.getAllUsers);
adminRouter.route("/get-profile-details").post(auth_1.authenticate, adminController_1.getUserById);
adminRouter.route("/force-delete-user").post(auth_1.authenticate, adminController_1.forceDeleteUser);
adminRouter
    .route("/add-product")
    .post(auth_1.authenticate, (0, validateProduct_1.productValidationRules)({ update: false }), validateProduct_1.productValidate, upload.array("imageFiles", 2), adminController_1.addProduct);
adminRouter
    .route("/delete-product/:productId")
    .delete(auth_1.authenticate, adminController_1.deleteProduct);
adminRouter
    .route("/update-product/:productId")
    .put(auth_1.authenticate, (0, validateProduct_1.productValidationRules)({ update: true }), validateProduct_1.productValidate, upload.array("imageFiles", 2), adminController_1.updateProduct);
exports.default = adminRouter;
