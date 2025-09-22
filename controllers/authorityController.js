const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Authority = require("../models/authority")
const dotenv =  require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // store in .env for production

// Register User
exports.register = async (req, res) => {
  try {
    const authority = new Authority(req.body);
    await authority.save();
    res.json({ message: "Athority registered successfully ✅" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const authority = await Authority.findOne({ email });
    if (!authority) return res.status(400).json({ error: "Invalid credentials ❌" });

    // check password
    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials ❌" });

    // create token
    const token = jwt.sign({ id: authority._id }, JWT_SECRET, { expiresIn: "24h" });

    res.json({ message: "Login successful ✅", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id || req.params._id;
        toString(id)
        const authority = await Authority.findById(id);
        if (!authority) {
            return res.status(404).json({ error: 'Authority not found' });
        }
        res.status(200).json(authority);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching Authority' });
    }
}