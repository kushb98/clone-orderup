import { Request, Response } from 'express-serve-static-core';
import Admin from '../../models/admin/adminModel';
import env from '../../utils/validateEnv';
import { sendEmail } from '../../utils/email';

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
		const requiredFields = ['firstname', 'lastname', 'email', 'username', 'role', 'password'];
		const missingFields: string[] = [];

		// Find missing fields
		for (const field of requiredFields) {
			if (!req.body[field]) {
				missingFields.push(field);
			}
		}

		// If there are missing fields, send an error response
		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: `The following fields are required: ${missingFields.join(', ')}`
			});
		}

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

		await sendEmail(
			adminUser.email,
			'Account Login Details',
			`Hi ${adminUser.firstname},\n\n
			Your account has been created.\n\n
			Username: ${adminUser.username}\n\n
			Password: ${password}\n\n
			You can log in to your account using the following link:\n\n
			http://localhost:${env.PORT}/api/v1/auth/orderup/login\n\n
			Thanks.`
		);

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
