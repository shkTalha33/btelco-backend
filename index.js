require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const quoteRoutes = require("./routes/quoteRoutes");
const blogRoutes = require("./routes/blogRoutes");
const headerRoutes = require("./routes/headerRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use("/api", quoteRoutes);
app.use("/api", blogRoutes);
app.use("/api", headerRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
