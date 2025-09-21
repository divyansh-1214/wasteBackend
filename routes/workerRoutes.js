const express = require("express")
const {register, login,getById} = require("../controllers/wAuthController")
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();
router.post("/register", register);
router.post("/login", login);

// Example of protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected profile route ✅", user: req.user });
});

router.get('/profile/:id', getById);

module.exports = router;