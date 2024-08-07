import { Request, Response } from 'express-serve-static-core';
import authDAO from '../../dao/authDao'; // Adjust the path to where your authDAO is located
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const loginController = async (req: Request, res: Response) => {
	try {
	  // Extract username and password
	  const { username, password } = req.body;
  
	  // DB call to find the user
	  const user = await authDAO.findAdminByUsername(username);
  
    // Check if user is found and password is present
    if (!user || !user.password) {
		return res.status(401).json({ success: false, message: 'Invalid username or password' });
	  }
	  // Assuming password is hashed using bcrypt
	  const isPasswordValid = await bcrypt.compare(password, user.password);
  
	  if (!isPasswordValid) {
		return res.status(401).json({ success: false, message: 'Invalid username or password' });
	  }
  
	  // Create access token
	  const accessToken = jwt.sign(
		{ userId: user._id, username: user.username },
		process.env.JWT_SECRET as string,
		{ expiresIn: process.env.JWT_EXPIRES_IN }
	  );
  
	  res.status(200).json({ success: true, message: 'Logged in successfully', user, accessToken });
	} catch (error) {
	  console.error('Login error:', error);
	  res.status(500).json({ success: false, message: 'An error occurred during login' });
	}
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
