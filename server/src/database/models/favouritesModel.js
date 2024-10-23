"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var favouritesSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, ref: "users" },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
        },
    ],
});
var favouritesModel = (0, mongoose_1.model)("favourites", favouritesSchema);
exports.default = favouritesModel;
