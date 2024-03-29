const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const pageRoutes = require("./routes/PageRoutes");
const portfolioRoutes = require("./routes/PortfolioRoutes");

require("dotenv").config();
const allowedOrigins = ['https://portfolio-frontend-app-e00bbe7a076d.herokuapp.com'];

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://portfolio-frontend-app-e00bbe7a076d.herokuapp.com', // Your deployed frontend application
      'http://localhost:3001' // Your local development environment
    ];
    // Check if the origin is one of the allowed origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Allow cookies to be sent
};

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/auth", userRoutes);
app.use("/api/editor", pageRoutes);
app.use("/api", portfolioRoutes);

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_URL}/?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose

  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    minPoolSize: 100,
    maxPoolSize: 500,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Portfolio Backend");
});

// Add the catch-all route handler here
app.use("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
