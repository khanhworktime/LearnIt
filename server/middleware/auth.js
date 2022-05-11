const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ success: false, message: 'Token not found' });

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        console.error(error.message)
        res.status(403).json({ success: false, message: "Invalid token" })
    }
}

module.exports = verifyToken;