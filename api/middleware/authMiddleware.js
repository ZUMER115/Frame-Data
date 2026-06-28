
// Verify token and authenticate user to access protected routes
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    // Verify the token using the secret key
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler


    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;