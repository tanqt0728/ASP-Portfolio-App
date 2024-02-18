const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  contactNumber: {
    number: { type: String, required: true },
    countryCode: { type: String, required: true },
  },
  location: {
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: true },
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = mongoose.model("User", userSchema);
