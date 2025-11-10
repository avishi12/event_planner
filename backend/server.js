require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_for_dev_only";

if (!MONGO_URI) {
  console.error("\u274c MONGO_URI is not set. Please provide MONGO_URI in environment or backend/.env");
  // Exit after a short delay so logs are flushed in container environments
  setTimeout(() => process.exit(1), 100);
}

if (!process.env.JWT_SECRET) {
  console.warn("\u26A0\ufe0f JWT_SECRET not set; using a default insecure secret. Set JWT_SECRET in production.");
}

mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => {
    console.error(" MongoDB connection error:", err);
    setTimeout(() => process.exit(1), 100);
  });

app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);
