const mongoose = require("mongoose");
const User = require("../models/userModel");

// create user login

const loginUser = async (req, res) => {
  res.json({ message: "login user " });
};
// create user login

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
//   res.json({ message: "signup user " });
};
module.exports = {
  loginUser,
  signupUser,
};
