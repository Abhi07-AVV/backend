const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const otpRoutes = require("./routes/otpRoutes");

const app = express();

// ✅ CORS – allow frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));

app.use(bodyParser.json());
app.use(express.static("public"));

// ✅ Connect MongoDB (Railway works perfectly)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ API Routes
app.use("/api", otpRoutes);

// ✅ Railway-required: Bind to 0.0.0.0
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Server running on ${PORT}`)
);
