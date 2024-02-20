const User = require("../models/User");
const Page = require('../models/Page');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/NodeMailer");
require("dotenv").config();

// Signup User
exports.signup = async (req, res) => {
  const { email, hashedPassword, fullName, dob, contactNumber, location } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPasswordNew = await bcrypt.hash(hashedPassword, 12);

    const user = new User({
      email,
      password: hashedPasswordNew,
      fullName,
      dob,
      contactNumber,
      location,
    });

    const savedUser = await user.save();

    const userPage = new Page({
      name: `${fullName}'s Portfolio`, 
      content: '', 
      owner: savedUser._id,
      visibility: 'unpublished', 
    });

    await userPage.save(); 
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetToken = hashedToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `${req.protocol}://${req.get("host")}/api/users/reset-password/${resetToken}`;
    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetURL}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    await sendEmail(email, "Your Password Reset Token", message);

    res.status(200).json({ message: "Token sent to email!" });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(500).json({ error: "Email could not be sent." });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Token is invalid or has expired." });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};
