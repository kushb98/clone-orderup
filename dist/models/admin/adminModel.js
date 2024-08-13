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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
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
        minLength: [8, 'Password is too short'],
        select: false,
    },
    resetControllerToken: String,
    resetControllerExpire: Date,
}, { timestamps: true });
// // Pre-save hook to hash password before saving
// adminSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     if (this.password) {
// 		this.password = await bcrypt.hash(this.password, 12);
// 	}
//     next();
// });
// // Instance method to compare passwords
// adminSchema.methods.correctPassword = async function (
//     candidatePassword: string,
//     userPassword: string
// ) {
//     return await bcrypt.compare(candidatePassword, userPassword);
// };
// Instance method to compare passwords
adminSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, userPassword);
    });
};
// Instance method to create password reset token
adminSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    this.resetControllerToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetControllerExpire = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes
    return resetToken;
};
const adminModel = mongoose_1.default.model('Admin', adminSchema);
exports.default = adminModel;
