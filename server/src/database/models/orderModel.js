"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Create the Order schema
var orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "completed", "canceled"],
        default: "pending",
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
// Create the model
var orderModel = mongoose_1.default.model("orders", orderSchema);
exports.default = orderModel;
