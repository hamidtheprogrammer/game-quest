"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testController_1 = require("../controllers/testController");
var testRoute = (0, express_1.Router)();
testRoute.route("/test").get(testController_1.test);
exports.default = testRoute;
