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
const nodemailer_1 = __importDefault(require("nodemailer"));
const validateEnv_1 = __importDefault(require("../../utils/validateEnv"));
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
        // Configuration for Mailtrap transporter
        const transporter = nodemailer_1.default.createTransport({
            host: validateEnv_1.default.MAILTRAP_HOST,
            port: validateEnv_1.default.MAILTRAP_PORT,
            auth: {
                user: validateEnv_1.default.MAILTRAP_USER,
                pass: validateEnv_1.default.MAILTRAP_PASS
            }
        });
        const mailOptions = {
            from: 'no-reply@yourapp.com',
            to: adminUser.email,
            subject: 'Account Created',
            text: `Hi ${adminUser.firstname},\n\nYour account has been created.\n\nUsername: ${adminUser.username}\n\n Password: ${password}\n\nThanks.`
        };
        yield transporter.sendMail(mailOptions);
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
