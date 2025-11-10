// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

// Import routes
const otpRoutes = require('./routes/otpRoutes');

const app = express();

// Use explicit CORS origin in production (set FRONTEND_URL in .env). For now allow all during debugging.
const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB with proper error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bulksms';

console.log('Attempting to connect to MongoDB at:', MONGODB_URI);

// Use proper connect with options and catch
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message || err);
    // Optional: exit process if DB is required
    // process.exit(1);
  });

// Mount routes with /api prefix
app.use('/api', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
