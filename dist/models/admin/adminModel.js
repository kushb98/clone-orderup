"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const adminSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required to login'],
        minLength: [8, 'Username is too short'],
        unique: [true, 'User with this username already exist'],
    },
    roles: {
        type: String,
        enum: {
            values: ['admin', 'manager'],
            message: '{VALUE} is not supported',
        },
        default: 'manager',
    },
    email: {
        type: String,
        validate: {
            validator: validator_1.default.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        minLenght: [8, 'Password is too short'],
        select: false,
    },
}, { timestamps: true });
const adminModel = mongoose_1.default.model('Admin', adminSchema);
exports.default = adminModel;
