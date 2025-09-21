const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied, token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token ❌" });
  }
};

module.exports = authMiddleware;
