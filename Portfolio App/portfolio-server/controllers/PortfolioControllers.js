const Portfolio = require("../models/Portfolio"); // Adjust the path to where your Portfolio model is located

// Create a new portfolio
exports.createPortfolio = async (req, res) => {
  const {
    user,
    title,
    description,
    coverLetterUrl,
    recommendationLetterUrl,
    profilePictureUrl,
    bannerPictureUrl,
    experiences,
    education,
    visibility,
    awards,
    references,
    skills,
    objective,
    contactInfo,
  } = req.body;

  try {
    const newPortfolio = new Portfolio({
      user,
      title,
      description,
      coverLetterUrl,
      recommendationLetterUrl,
      profilePictureUrl,
      bannerPictureUrl,
      experiences,
      education,
      visibility,
      awards,
      references,
      skills,
      objective,
      contactInfo,
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get all portfolios
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single portfolio by ID
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) res.status(404).send("No portfolio found with that ID");
    else res.status(200).json(portfolio);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a portfolio
exports.updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    coverLetterUrl,
    recommendationLetterUrl,
    profilePictureUrl,
    bannerPictureUrl,
    experiences,
    education,
    visibility,
    awards,
    references,
    skills,
    objective,
    contactInfo,
  } = req.body;

  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      {
        title,
        description,
        coverLetterUrl,
        recommendationLetterUrl,
        profilePictureUrl,
        bannerPictureUrl,
        experiences,
        education,
        visibility,
        awards,
        references,
        skills,
        objective,
        contactInfo,
      },
      { new: true }
    );

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a portfolio
exports.deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    await Portfolio.findByIdAndRemove(id);
    res.status(200).json({ message: "Portfolio deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
