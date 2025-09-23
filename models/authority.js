// models/Authority.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authoritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workerType: { 
      type: String, 
      required: true,
      enum: ['superviser', 'Zone_Head', 'BranchHead', 'maintenance', ]
    },
  },
  { timestamps: true }
);

// hash password before save
authoritySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare password method
authoritySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Authority = mongoose.model("Authority", authoritySchema);
module.exports = Authority;
