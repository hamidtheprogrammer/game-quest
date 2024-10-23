"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true, max: 2 }],
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    genre: [{ type: String, required: true, max: 5 }],
    age: { type: Number, required: true },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "reviews" }],
});
var productModel = (0, mongoose_1.model)("products", productSchema);
exports.productModel = productModel;
