"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../../controllers/admin/authControllers");
/****
 * @function adminRouter() creates an express router so we can access the HTTP methods
 *
 */
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post('/orderup/login', authControllers_1.loginController);
exports.adminRouter.post('/orderup/logout', authControllers_1.logoutController);
exports.adminRouter.post('/orderup/forgot-password', authControllers_1.forgotController);
exports.adminRouter.post('/orderup/reset-password/:token', authControllers_1.resetController);
exports.adminRouter.post('/orderup/reset-password', authControllers_1.resetController);
exports.adminRouter.post('/orderup/change-password', authControllers_1.changePasswordController);
exports.adminRouter.post('/orderup/login/refresh-token', authControllers_1.refreshTokenController);
exports.adminRouter.post('/orderup-owner/add-tm-new', authControllers_1.addAdminController);
