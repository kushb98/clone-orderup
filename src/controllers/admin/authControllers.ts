import { Request, Response } from 'express-serve-static-core';

export const loginController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Loggedin!!' });
};
export const logoutController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Logged out!!' });
};
export const forgotController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Forgot controller!!' });
};
export const resetController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'reset pass controller!!' });
};
export const refreshTokenController = (req: Request, res: Response) => {
	res
		.status(200)
		.json({ success: true, message: 'refresh token controller!!' });
};

export const addAdminController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'admin created!!' });
};
