"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
var userModel = mongoose_1.default.model("users", userSchema);
exports.userModel = userModel;
