"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validationRules = void 0;
var express_validator_1 = require("express-validator");
var validationRules = function (_a) {
    var login = _a.login, updateProfile = _a.updateProfile;
    if (login) {
        return [
            (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
            (0, express_validator_1.body)("password")
                .isLength({ min: 8 })
                .withMessage("Password must have minimum of 8 characters"),
        ];
    }
    if (updateProfile) {
        return [
            (0, express_validator_1.body)("email").optional().isEmail().withMessage("Invalid email"),
            (0, express_validator_1.body)("username")
                .optional()
                .notEmpty()
                .withMessage("Username is required"),
            (0, express_validator_1.body)("password")
                .optional()
                .isLength({ min: 8 })
                .withMessage("Password must have a minimum of 8 characters"),
        ];
    }
    return [
        (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
        (0, express_validator_1.body)("username").notEmpty().withMessage("username required"),
        (0, express_validator_1.body)("password")
            .isLength({ min: 8 })
            .withMessage("Password must have minimum of 8 characters"),
    ];
};
exports.validationRules = validationRules;
var validate = function (req, res, next) {
    var error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error });
    }
    next();
};
exports.validate = validate;
