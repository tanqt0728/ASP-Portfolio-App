const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtCheck(req, res, next) {
  // Extract the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1]; // Get the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (exception) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = jwtCheck;
