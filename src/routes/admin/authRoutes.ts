import express from "express";
import {
	addAdminController,
	forgotController,
	loginController,
	logoutController,
	refreshTokenController,
	resetController,
	changePasswordController
} from '../../controllers/admin/authControllers';
import { authenticateToken, authorizeRoles } from "../../middleware/auth";

/****
 * @function adminRouter() creates an express router so we can access the HTTP methods
 *
 */
export const adminRouter = express.Router();

adminRouter.post('/orderup/login', loginController);
adminRouter.post('/orderup/logout', logoutController);
adminRouter.post('/orderup/forgot-password', forgotController);
adminRouter.post('/orderup/reset-password/:token', resetController);
adminRouter.post('/orderup/reset-password', resetController);
adminRouter.post('/orderup/change-password', changePasswordController);
adminRouter.post('/orderup/login/refresh-token', refreshTokenController);
adminRouter.post(
	"/orderup-owner/add-tm-new",
	authenticateToken,
	authorizeRoles("admin", "manager"),
	addAdminController
);

