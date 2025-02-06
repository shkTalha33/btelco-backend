const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
    createOrUpdateHeader,
    getHeaderByType,
    deleteHeaderByType
} = require("../controllers/headerController");

router.post("/header", upload.single("image"), createOrUpdateHeader);
router.get("/header/:type", getHeaderByType);
router.delete("/header/:type", deleteHeaderByType);

module.exports = router;
