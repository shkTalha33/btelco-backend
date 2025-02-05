const express = require("express");
const { submitForm, getQuote } = require("../controllers/quoteController");

const router = express.Router();

router.post("/quote", submitForm);
router.get("/quotes", getQuote);

module.exports = router;
