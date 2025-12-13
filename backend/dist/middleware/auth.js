const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const admin = await Admin.findById(decoded.id);

        if (!admin || !admin.isActive) {
            return res.status(401).json({ message: 'Invalid token or inactive user.' });
        }

        req.admin = admin;
        req.user = admin; // For backward compatibility
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin?.role || req.user?.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

module.exports = { auth, requireRole };