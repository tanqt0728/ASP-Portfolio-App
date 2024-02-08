const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/NodeMailer");
const crypto = require("crypto"); // Ensure this is defined if using crypto for tokens

exports.signup = async (req, res) => {
  const { email, hashedPassword: hashedPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    // Directly store the client-hashed password, ideally with additional server-side security measures
    const result = await User.create({ email, password: hashedPassword });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.login = async (req, res) => {
  const { email, password: clientHashedPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (clientHashedPassword != user.password) {
      return res.status(400).send("Invalid credentials.");
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found.");

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail(email, "Password Reset Link", message);

    res.status(200).send("Password reset link sent to your email.");
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(500).json({
      message: "There was an error sending the email. Try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiration: { $gt: Date.now() }, // Checks if the token is not expired
    });

    if (!user) {
      return res.status(400).send("Token is invalid or has expired.");
    }

    user.password = await bcrypt.hash(password, 12); // Hash the new password
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpiration = undefined; // Clear the token expiration
    await user.save();

    res.status(200).send("Password has been reset successfully.");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
