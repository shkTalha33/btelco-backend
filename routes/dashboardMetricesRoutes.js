const express = require("express");
const router = express.Router();
const { getMetrics } = require("../controllers/dashboardMetrics");
const verifyToken = require("../middleware/authMiddleware");

router.get("/metrices", verifyToken , getMetrics);

module.exports = router;
