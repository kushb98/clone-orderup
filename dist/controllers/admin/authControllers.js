"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAdminController = exports.refreshTokenController = exports.changePasswordController = exports.resetController = exports.forgotController = exports.logoutController = exports.loginController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminModel_1 = __importDefault(require("../../models/admin/adminModel"));
const loginController = (req, res) => {
    res.status(200).json({ success: true, message: 'Loggedin!!' });
};
exports.loginController = loginController;
const logoutController = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out!!' });
};
exports.logoutController = logoutController;
const forgotController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const admin = yield adminModel_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'No user found with this email address.' });
        }
        // Generate random reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetControllerToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
        const resetControllerExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
        // const resetControllerExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        admin.resetControllerToken = resetControllerToken;
        // const now = new Date();
        // const intervalMinutes = 10;
        // const intervalMillis = intervalMinutes * 60 * 1000; // Convert minutes to milliseconds
        // const resetControllerExpire = new Date(now.getTime() + intervalMillis);
        admin.resetControllerExpire = resetControllerExpire;
        // admin.resetControllerExpire = resetControllerExpire;
        yield admin.save({ validateBeforeSave: false });
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
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error in sending email. Try again later.' });
    }
});
exports.forgotController = forgotController;
const resetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetControllerToken = crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
        const admin = yield adminModel_1.default.findOne({
            resetControllerToken,
            resetControllerExpire: { $gt: Date.now() },
        });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Token is invalid or has expired.' });
        }
        admin.password = req.body.password;
        admin.resetControllerToken = undefined;
        admin.resetControllerExpire = undefined;
        yield admin.save();
        res.status(200).json({ success: true, message: 'Password reset successful!' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error resetting password. Try again later.' });
    }
});
exports.resetController = resetController;
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user ID and new password from request body
        const { userId, currentPassword, newPassword } = req.body;
        // Validate input fields
        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please provide userId, currentPassword, and newPassword.' });
        }
        // Find the admin user by ID
        const admin = yield adminModel_1.default.findById(userId);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin user not found.' });
        }
        // Ensure the current password is defined
        const hashedPassword = admin.password || '';
        // Check if the current password is correct
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }
        // Hash the new password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedNewPassword = yield bcryptjs_1.default.hash(newPassword, salt);
        // Update the password
        admin.password = hashedNewPassword;
        // Save the updated admin document
        yield admin.save();
        res.status(200).json({ success: true, message: 'Password changed successfully!' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error changing password. Try again later.' });
    }
});
exports.changePasswordController = changePasswordController;
const refreshTokenController = (req, res) => {
    res
        .status(200)
        .json({ success: true, message: 'refresh token controller!!' });
};
exports.refreshTokenController = refreshTokenController;
const addAdminController = (req, res) => {
    res.status(200).json({ success: true, message: 'admin created!!' });
};
exports.addAdminController = addAdminController;
