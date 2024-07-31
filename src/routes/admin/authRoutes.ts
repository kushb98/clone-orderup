import express from 'express';
import {
	addAdminController,
	forgotController,
	loginController,
	logoutController,
	refreshTokenController,
	resetController,
} from '../../controllers/admin/authControllers';
/****
 * @function adminRouter() creates an express router so we can acces the HTTP methods
 *
 */
export const adminRouter = express.Router();

adminRouter.post('/orderup/login', loginController);
adminRouter.post('/orderup/logout', logoutController);
adminRouter.post('/orderup/forgot-password', forgotController);
adminRouter.post('/orderup/reset-password', resetController);
adminRouter.post('/orderup/login/refresh-token', refreshTokenController);
adminRouter.post('/orderup-owener/add-tm-new', addAdminController);
