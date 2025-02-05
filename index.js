require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const quoteRoutes = require("./routes/quoteRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", quoteRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
