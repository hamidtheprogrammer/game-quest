"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "users" },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "products",
            },
            quantity: { type: Number, required: true },
        },
    ],
});
var cartModel = (0, mongoose_1.model)("carts", cartSchema);
exports.default = cartModel;
