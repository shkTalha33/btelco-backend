const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
    createOrUpdateHeader,
    getHeaderByType,
    deleteHeaderByType,
    getAllHeaders,
    updateHeader,
    createHeader
} = require("../controllers/headerController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/header", verifyToken, createHeader);
router.put("/header/:id", verifyToken, updateHeader);
router.get("/header/:id", getHeaderByType);
router.get("/header", getAllHeaders);
router.delete("/header/:id", verifyToken, deleteHeaderByType);

module.exports = router;