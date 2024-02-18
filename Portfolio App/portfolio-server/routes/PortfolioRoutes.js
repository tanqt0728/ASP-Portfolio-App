const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/PortfolioControllers");

router.post("/portfolios", portfolioController.createPortfolio);
router.get("/portfolios", portfolioController.getAllPortfolios);
router.get("/portfolios/:id", portfolioController.getPortfolioById);
router.put("/portfolios/:id", portfolioController.updatePortfolio);
router.delete("/portfolios/:id", portfolioController.deletePortfolio);

module.exports = router;
