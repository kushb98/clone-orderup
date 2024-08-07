import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


export interface AdminDocument extends Document {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	role: string;
	password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define Admin schema to save to DB
const AdminSchema: Schema = new Schema(
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


// Hash password before saving it into DB
AdminSchema.pre<AdminDocument>('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Compare password hash to check if password matches
AdminSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

const adminModel = mongoose.model<AdminDocument>('Admin', AdminSchema);
export default adminModel;
