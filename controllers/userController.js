const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = `mySecretKeyIsMyDogsName`;

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json({ message: "Users found!", data: users });
    } else {
      res.status(404).json({ message: "Usermodel is empty!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const requiredFields = [
      "namaDepan",
      "username",
      "password",
      "role",
      "email",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `${field} harus diisi.`,
          message: `Wajib diisi: ${requiredFields}`,
        });
      }
    }

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: "User sudah ada!" });
    } else {
      res.status(500).json({ error: "Ada kendala saat mendaftarkan user." });
    }
  }
};

exports.getUserDetail = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User tidak ada!" });
    }
    res.json({ message: "User ditemukan!", "data:": user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.auth = async (req, res) => {
  let { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(404).json({
      error: "User tidak ditemukan",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({ username, role: user.role }, secretKey, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Autentikasi berhasil",
      token,
    });
  } else {
    return res.status(401).json({
      message: "Autentikasi gagal, password salah",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const updatedUser = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User tidak ada!" });
    }

    Object.keys(updatedUser).forEach((element) => {
      if (element in updatedUser) {
        user[element] = updatedUser[element];
      }
    });

    await user.save();
    res.status(200).json({ message: "User berhasil diubah!", data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndDelete(username);
    if (!user) {
      return res.status(404).json({ message: "User tidak ada!" });
    }
    res
      .status(200)
      .json({ message: "User berhasil dihapus!", deletedData: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
