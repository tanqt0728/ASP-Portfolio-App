const express = require("express");
const jwtCheck = require('../middleware/jwtCheck'); 

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  validateToken,
} = require("../controllers/UserControllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/validate-token", jwtCheck, validateToken);

module.exports = router;
