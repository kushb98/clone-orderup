"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAdminController = exports.refreshTokenController = exports.resetController = exports.forgotController = exports.logoutController = exports.loginController = void 0;
const loginController = (req, res) => {
    res.status(200).json({ success: true, message: 'Loggedin!!' });
};
exports.loginController = loginController;
const logoutController = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out!!' });
};
exports.logoutController = logoutController;
const forgotController = (req, res) => {
    res.status(200).json({ success: true, message: 'Forgot controller!!' });
};
exports.forgotController = forgotController;
const resetController = (req, res) => {
    res.status(200).json({ success: true, message: 'reset pass controller!!' });
};
exports.resetController = resetController;
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
