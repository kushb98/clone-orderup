import { Request, Response } from 'express-serve-static-core';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import adminModel from '../../models/admin/adminModel';

export const loginController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Loggedin!!' });
};
export const logoutController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'Logged out!!' });
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
        // const resetControllerExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        admin.resetControllerToken = resetControllerToken;
		// const now = new Date();
		// const intervalMinutes = 10;
		// const intervalMillis = intervalMinutes * 60 * 1000; // Convert minutes to milliseconds
		// const resetControllerExpire = new Date(now.getTime() + intervalMillis);
		admin.resetControllerExpire = resetControllerExpire;
        // admin.resetControllerExpire = resetControllerExpire;

        await admin.save({ validateBeforeSave: false });

        // Send the reset token via email (you need to implement the sendEmail function)
        const resetURL = `${req.protocol}://${req.get('host')}/orderup/reset-password/${resetToken}`;
        const message = `Forgot your password? Submit a request with your new password to: ${resetURL}`;

        // await sendEmail({
        //     email: admin.email,
        //     subject: 'Your password reset token (valid for 10 minutes)',
        //     message,
        // });

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

export const addAdminController = (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'admin created!!' });
};
