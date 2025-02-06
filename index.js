require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const quoteRoutes = require("./routes/quoteRoutes");
const blogRoutes = require("./routes/blogRoutes");
const headerRoutes = require("./routes/headerRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", quoteRoutes);
app.use("/api", blogRoutes);
app.use("/api", headerRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
