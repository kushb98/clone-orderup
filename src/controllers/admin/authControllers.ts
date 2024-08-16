import { Request, Response } from 'express-serve-static-core';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import adminModel from '../../models/admin/adminModel';
import adminService from '../../services/adminService'; 
import Admin from '../../models/admin/adminModel';
import env from '../../utils/validateEnv';
import { sendEmail } from '../../utils/email';
import jwt from 'jsonwebtoken';


export const loginController = async (req: Request, res: Response) => {
	try {
	  // Extract username and password
	  const { username, password } = req.body;
  
	  // Check if username and password are provided
	  if (!username || !password) {
		return res.status(400).json({ success: false, message: 'Username and password are required' });
	  }
  
	  // DB call to find the user
	  const user = await adminService.findAdminByUsername(username);
  
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

const blacklist = new Set<string>();

export const logoutController = (req: Request, res: Response) => {
	try {
        // 1. Extract the token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        if (token == null) return res.sendStatus(401);
        if (blacklist.has(token)) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        // 2. Verify the token
        jwt.verify(token, process.env.JWT_SECRET as string, (err, String) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }

            // 3. Simulate token invalidation (in this case, clear the token on the client side)
            // Optionally, you could implement token blacklisting here
            blacklist.add(token);
            res.status(200).json({
                success: true,
                message: 'Logged out successfully',
                token: null, 
            });

        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during logout' });
    }
};
export const forgotController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'No user found with this email address.' });
        }

        // Generate random reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetControllerToken = crypto.createHash('sha256').update(resetToken).digest('hex');
		const resetControllerExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
        
        admin.resetControllerToken = resetControllerToken;
		
		admin.resetControllerExpire = resetControllerExpire;
        
        await admin.save({ validateBeforeSave: false });

        // Send the reset token via email (you need to implement the sendEmail function)
        const resetURL = `${req.protocol}://${req.get('host')}/orderup/reset-password/${resetToken}`;
        const message = `Forgot your password? Submit a request with your new password to: ${resetURL}`;


        res.status(200).json({
            success: true,
            message: `Token sent to email: ${admin.email}`,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error in sending email. Try again later.' });
    }
};
export const resetController = async (req: Request, res: Response) => {
    try {
        const resetControllerToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const admin = await adminModel.findOne({
            resetControllerToken,
            resetControllerExpire: { $gt: Date.now() },
        });

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Token is invalid or has expired.' });
        }

        admin.password = req.body.password;
        admin.resetControllerToken = undefined;
        admin.resetControllerExpire = undefined;

        await admin.save();

        res.status(200).json({ success: true, message: 'Password reset successful!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error resetting password. Try again later.' });
    }
};

export const changePasswordController = async (req: Request, res: Response) => {
    try {
        // Extract user ID and new password from request body
        const { userId, currentPassword, newPassword } = req.body;

        // Validate input fields
        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please provide userId, currentPassword, and newPassword.' });
        }

        // Find the admin user by ID
        const admin = await adminModel.findById(userId);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin user not found.' });
        }

        // Ensure the current password is defined
        const hashedPassword = admin.password || '';

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        admin.password = hashedNewPassword;

        // Save the updated admin document
        await admin.save();
        res.status(200).json({ success: true, message: 'Password changed successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error changing password. Try again later.' });
    }
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
			adminUser.email as string,
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
