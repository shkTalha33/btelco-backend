const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
    createOrUpdateHeader,
    getHeaderByType,
    deleteHeaderByType,
    getAllHeaders
} = require("../controllers/headerController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/header", verifyToken, createOrUpdateHeader);
router.get("/header/:category", verifyToken, getHeaderByType);
router.get("/header", verifyToken, getAllHeaders);
router.delete("/header/:category", verifyToken, deleteHeaderByType);

module.exports = router;