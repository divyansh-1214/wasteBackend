const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const WorkerSchema = new mongoose.Schema({
  role: { type: String, default: "worker" },
  name: { type: String, required: true },
  aadhar: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  workerType: { 
    type: String, 
    required: true,
    enum: ['garbage_collector', 'sweeper', 'recycling_worker', 'supervisor', 'maintenance', 'driver', 'other',"ward_head"]
  },
  email: { type: String, required: true, unique: true },
  zone: { type: String, },
});

WorkerSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
const Worker = mongoose.model('Worker',WorkerSchema);
module.exports = Worker;