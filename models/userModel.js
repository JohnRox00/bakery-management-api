const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  branch_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
