const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false, message: "Access token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET)
        console.log(token);
        console.log(process.env.ADMIN_ACCESS_TOKEN_SECRET);
        req.body.adminId = decoded.adminId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        })
    }
}



module.exports = verifyAdminToken;