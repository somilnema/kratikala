import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    let { fullName, username, email, password } = await request.json();

    await connectToDatabase();

    // Normalize email
    if (email) {
        email = email.trim().toLowerCase();
    }

    // LOGIN: Only email and password provided
    if (!fullName && !username && email && password) {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
        }
        // Success (you can add JWT or session logic here)
        return NextResponse.json({ message: 'Login successful', user: { fullName: user.fullName, username: user.username, email: user.email } }, { status: 200 });
    }

    // REGISTRATION: All fields required
    if (!fullName || !username || !email || !password) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Do NOT hash password here; let the Mongoose pre-save hook handle it
    const newUser = new User({ fullName, username, email, password });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}

