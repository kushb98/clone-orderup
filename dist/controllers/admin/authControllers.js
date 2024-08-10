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
exports.addAdminController = exports.refreshTokenController = exports.resetController = exports.forgotController = exports.logoutController = exports.loginController = void 0;
const adminModel_1 = __importDefault(require("../../models/admin/adminModel"));
const validateEnv_1 = __importDefault(require("../../utils/validateEnv"));
const email_1 = require("../../utils/email");
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
const addAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).json({ success: true, message: 'admin created!!' });
    try {
        const requiredFields = ['firstname', 'lastname', 'email', 'username', 'role', 'password'];
        const missingFields = [];
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
        const adminUser = new adminModel_1.default({
            firstname,
            lastname,
            email,
            username,
            role,
            password
        });
        yield adminUser.save();
        yield (0, email_1.sendEmail)(adminUser.email, 'Account Login Details', `Hi ${adminUser.firstname},\n\n
			Your account has been created.\n\n
			Username: ${adminUser.username}\n\n
			Password: ${password}\n\n
			You can log in to your account using the following link:\n\n
			http://localhost:${validateEnv_1.default.PORT}/api/v1/auth/orderup/login\n\n
			Thanks.`);
        res.status(201).json({
            success: true,
            message: 'Admin created and email sent!',
            adminUser: {
                _id: adminUser._id,
                email: adminUser.email
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.addAdminController = addAdminController;
