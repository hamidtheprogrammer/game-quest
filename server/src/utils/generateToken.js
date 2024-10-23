"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var createToken = function (_a) {
    var res = _a.res, userId = _a.userId;
    var key = process.env.SECRET_KEY;
    var token = jsonwebtoken_1.default.sign({ userId: userId }, key, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 84000000,
    });
};
exports.default = createToken;
