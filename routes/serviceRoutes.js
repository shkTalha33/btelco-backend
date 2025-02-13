const express = require("express");
const multer = require("multer");
const path = require("path");
const {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/serviceController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/service/", verifyToken, createService);
router.get("/service/", verifyToken, getServices);
router.get("/service/:id", verifyToken, getServiceById);
router.put("/service/:id", verifyToken, updateService);
router.delete("/service/:id", verifyToken, deleteService);

module.exports = router;
