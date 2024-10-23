"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var favouritesController_1 = require("../controllers/favouritesController");
var auth_1 = require("../middlewares/auth");
var favouritesRouter = (0, express_1.Router)();
favouritesRouter
    .route("/addtofavourites/:productId")
    .post(auth_1.authenticate, favouritesController_1.addToFavourites);
favouritesRouter.route("/getfavourites").get(auth_1.authenticate, favouritesController_1.getFavourites);
favouritesRouter
    .route("/removefromfavourites/:productId")
    .delete(auth_1.authenticate, favouritesController_1.removeFromFavourites);
exports.default = favouritesRouter;
