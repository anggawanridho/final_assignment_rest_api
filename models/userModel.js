const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  namaDepan: {
    type: String,
    required: true,
  },
  namaBelakang: {
    type: String,
    default: "hailhydra",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "guest",
  },
  email: {
    type: String,
    unique: true,
  },
  nomorTelepon: {
    type: String,
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
