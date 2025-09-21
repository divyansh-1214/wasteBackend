const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhar: { type: String, required: true, unique: true },
  numberOfPersons: { type: Number, required: true },
  personsDetails: [{
    name: { type: String, required: true },
    aadhar: { type: String, required: true }
  }],
  address: { type: String, required: true },
  garbagePickerReviewReference: { type: String },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
