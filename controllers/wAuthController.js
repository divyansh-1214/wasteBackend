const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Worker = require('../models/worker')
const dotenv =  require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
exports.register = async (req, res) =>{
    try{
        const worker = new Worker(req.body);
        await worker.save();
        res.json({message:"worker added"})
    }catch(err){
        res.status(404).json({error:err.message})
    }
};

exports.login = async (req,res)=>{
    try{
        const { email, password } = req.body;
        console.log(req.body)
        // Find user by email
        const user = await Worker.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials ❌" });

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials ❌" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ message: "Login successful ✅", token });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const id = req.params.id || req.params._id;
        toString(id)
        const user = await Worker.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDA2MWE1MzRkOTI3MTMzZDg1MGEzMCIsImlhdCI6MTc1ODQ4Nzc5MywiZXhwIjoxNzU4NTc0MTkzfQ.GTPyFpHMblU3sv79Kpt78DKN14JbKpc7IY0hg2ywNcQ