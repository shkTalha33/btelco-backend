const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { uploadImage } = require("../controllers/imageController");
const verifyToken = require("../middleware/authMiddleware");

// Route for uploading an image
router.post("/image/upload", verifyToken, upload.single("image"), uploadImage);

module.exports = router;
