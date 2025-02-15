const express = require("express");
const router = express.Router();
const { createPage, updatePage, getAllPages, getPageByCategory, deletePage } = require("../controllers/pageController");
const verifyToken = require("../middleware/authMiddleware");

// Routes
router.post("/static/page", verifyToken, createPage); // Create a page
router.put("/static/page", verifyToken, updatePage); // Update a page
router.get("/static/page", getAllPages); // Get all pages
router.get("/static/page/:category", getPageByCategory); // Get a page by category
router.delete("/static/page/:category", verifyToken, deletePage); // Delete a page

module.exports = router;
