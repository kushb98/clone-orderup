import { Request, Response } from 'express-serve-static-core';
import Admin from '../../models/admin/adminModel';

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

export const addAdminController = async (req: Request, res: Response) => {
	// res.status(200).json({ success: true, message: 'admin created!!' });
	try {
		const { firstname, lastname, email, username, role, password } = req.body;

		const adminUser = new Admin({
			firstname,
			lastname,
			email,
			username,
			role,
			password
		});

		await adminUser.save();


		res.status(201).json({
			success: true,
			message: 'Admin created and email sent!',
			adminUser: {
			  _id: adminUser._id,
			  email: adminUser.email
			}
		  });

	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};
