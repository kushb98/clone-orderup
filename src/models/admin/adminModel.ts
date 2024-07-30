import { timeStamp } from 'console';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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
			minLenght: [8, 'Password is too short'],
			select: false,
		},
	},
	{ timestamps: true }
);

const adminModel = mongoose.model('Admin', adminSchema);
export default adminModel;
