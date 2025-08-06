import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Your sign-up logic here
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save({ session });

        const token = jwt.sign( { userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token
            },
            data: {
                user: newUser
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        // Your sign-in logic here
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        // Your sign-out logic here
    } catch (error) {
        next(error);
    }
}