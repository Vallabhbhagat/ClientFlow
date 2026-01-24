const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

const isMember = (req, res, next) => {
    if (!req.user || req.user.role !== "member") {
        return res.status(403).json({ message: "Members only" });
    }
    next();
};

module.exports = { authMiddleware, isAdmin, isMember };
