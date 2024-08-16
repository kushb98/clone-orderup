import { timeStamp } from 'console';
import mongoose, { Schema, Document, Collection } from 'mongoose';
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



// Define AdminDocument interface, extending from IAdmin
export interface AdminDocument extends IAdmin {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the Admin schema to save to DB
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
            unique: [true, 'User with this username already exists'],
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
                message: 'Please provide a valid email',
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

// Pre-save hook to hash the password before saving it to the DB
AdminSchema.pre<IAdmin>('save', async function (next) {
    if (!this.isModified('password')) return next();
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});



// Instance method to compare passwords
AdminSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to create a password reset token
AdminSchema.methods.createPasswordResetToken = function (): string {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetControllerToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetControllerExpire = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

    return resetToken;
};

const adminModel = mongoose.model<AdminDocument>('Admin', AdminSchema);
export default adminModel;