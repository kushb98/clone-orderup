import { timeStamp } from 'console';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


interface IAdmin extends Document {
    firstname?: string;
    lastname?: string;
    username: string;
    roles: 'admin' | 'manager';
    email?: string;
    password?: string;
    resetControllerToken?: string;
    resetControllerExpire?: Date;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    createPasswordResetToken(): string;
}


const adminSchema = new mongoose.Schema(
	{
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
				validator: validator.isEmail,
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
	},
	{ timestamps: true }
);

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
adminSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to create password reset token
adminSchema.methods.createPasswordResetToken = function (): string {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetControllerToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetControllerExpire = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

    return resetToken;
};


const adminModel = mongoose.model('Admin', adminSchema);
export default adminModel;
