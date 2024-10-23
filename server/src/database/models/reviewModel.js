"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "users" },
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "products" },
    rating: { type: Number, required: true },
    comment: { type: String },
});
var reviewModel = (0, mongoose_1.model)("reviews", reviewSchema);
exports.default = reviewModel;
