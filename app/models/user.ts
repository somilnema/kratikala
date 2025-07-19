import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt'


// Define the interface for the User document
export interface IUser extends Document {
    email: string;
    password: string;
}

// Define a User schema
const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Consider hashing the password before storing
});

// Hash the password before saving the user
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Check if the User model already exists
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
