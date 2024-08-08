"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = require("controllers/admin/adminAuthController");
/****
 * @function loginRouter() creates an express router so we can acces the HTTP methods
 *
 */
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post('/orderup/login', adminAuthController_1.loginController);
