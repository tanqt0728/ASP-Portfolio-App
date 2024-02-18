const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

const educationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

const referenceSchema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  relationship: { type: String, required: true },
});

const portfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverLetterUrl: { type: String }, // URL to the cover letter file stored in S3
  recommendationLetterUrl: { type: String },
  profilePictureUrl: { type: String },
  bannerPictureUrl: { type: String },
  experiences: [experienceSchema],
  education: [educationSchema],
  visibility: { type: String, enum: ["edit", "live"], default: "edit" },
  awards: [{ type: String }],
  references: [referenceSchema],
  skills: [{ type: String, required: true }],
  objective: { type: String },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
  },
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
