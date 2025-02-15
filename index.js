require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const quoteRoutes = require("./routes/quoteRoutes");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");
const headerRoutes = require("./routes/headerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"], // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api", quoteRoutes);
app.use("/api", blogRoutes);
app.use("/api", headerRoutes);
app.use("/api", imageRoutes);
app.use("/api", adminRoutes);
app.use("/api", serviceCategoryRoutes);
app.use("/api", blogCategoryRoutes);
app.use("/api", serviceRoutes);
app.use("/api", pageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
