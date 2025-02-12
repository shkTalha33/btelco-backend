const express = require("express");
const { submitForm, getQuote } = require("../controllers/quoteController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.post("/quote", verifyToken, submitForm);
router.get("/quotes", verifyToken, getQuote);

module.exports = router;
