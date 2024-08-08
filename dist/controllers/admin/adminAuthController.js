"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAdminController = exports.loginController = void 0;
const loginController = (req, res) => {
    res.status(200).json({ success: true, message: 'Loggedin!!' });
};
exports.loginController = loginController;
const addAdminController = (req, res) => {
    res.status(200).json({ success: true, message: 'admin created!!' });
};
exports.addAdminController = addAdminController;
