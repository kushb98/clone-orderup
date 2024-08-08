import { Request, Response } from 'express-serve-static-core';
import Admin from '../../models/admin/adminModel';
import nodemailer from 'nodemailer';
import env from '../../utils/validateEnv';

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

		// Configuration for Mailtrap transporter
		const transporter = nodemailer.createTransport({
			host: env.MAILTRAP_HOST,
			port: env.MAILTRAP_PORT,
			auth: {
			  user: env.MAILTRAP_USER,
			  pass: env.MAILTRAP_PASS
			}
		  });
	  
		  const mailOptions = {
			from: 'no-reply@yourapp.com',
			to: adminUser.email,
			subject: 'Account Created',
			text: `Hi ${adminUser.firstname},\n\nYour account has been created.\n\nUsername: ${adminUser.username}\n\n Password: ${password}\n\nThanks.`
		  };
	  
		  await transporter.sendMail(mailOptions);

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
