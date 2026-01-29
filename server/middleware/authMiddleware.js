const jwt = require("jsonwebtoken");

// Admin
const adminAuth = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin") return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

// Member
const memberAuth = (req, res, next) => {
  const token = req.cookies.member_token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "teamMember") return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

module.exports = { adminAuth, memberAuth };
