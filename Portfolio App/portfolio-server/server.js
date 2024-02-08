const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3001", // Allow only your frontend to make requests
  credentials: true, // Allow cookies to be sent
};
const app = express();
const PORT = process.env.PORT || 3000;
const Portfolio = require("./models/Portfolio");
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/auth", userRoutes);

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
app.get("/api/portfolio", async (req, res) => {
  const portfolios = await Portfolio.find();
  res.json(portfolios);
});

app.post("/api/portfolio", async (req, res) => {
  const newPortfolio = new Portfolio(req.body);
  const savedPortfolio = await newPortfolio.save();
  res.json(savedPortfolio);
});
// Add the catch-all route handler here
app.use("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
