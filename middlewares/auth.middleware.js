import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const authorize = async (req, res, next) => {
    try {
        let token;

        // Check if token is provided in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(401).json({ message: 'Unauthorized, user not found' });

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized, token invalid' });
        console.error('Authorization error:', error);
        next(error); // Pass the error to the next middleware
    }
}

export default authorize;