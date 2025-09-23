const modules = require("../models/modules");
const register = async (req, res) => {
  try {
    const module = await modules.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const Update = async (req, res) => {
  try {
    const { user, progress } = req.body;
    const module = await modules.findOne({ user: user });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    module.progress = progress;
    await module.save();
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getById = async (req, res) => {
  try {
    const user = req.params.id;
    const module = await modules.findOne({ user: user });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(200).json(module)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { Update, register,getById };
module.exports = { Update, register,getById };
