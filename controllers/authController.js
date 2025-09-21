const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const dotenv =  require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // store in .env for production

// Register User
exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User registered successfully ✅" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials ❌" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials ❌" });

    // create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.json({ message: "Login successful ✅", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//when i am geting the user is it is givinnf me error
exports.getById = async (req, res) => {
    try {
        const id = req.params.id || req.params._id;
        toString(id)
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}
// exports.getById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const users = await User.find().select('-password'); // Get all users without passwords
        
//         // Find the specific user by ID

        
//         if (!users) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ error: 'Error fetching user' });
//     }
// }
