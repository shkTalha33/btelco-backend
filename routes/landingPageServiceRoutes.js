const express = require("express");
const router = express.Router();
const landingPageServiceController = require("../controllers/landingPageServiceController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/landing/service",verifyToken, landingPageServiceController.createLandingPageService);
router.get("/landing/service", landingPageServiceController.getAllLandingPageServices);
router.get("/landing/service/:id", landingPageServiceController.getLandingPageServiceById);
router.put("/landing/service/:id",verifyToken, landingPageServiceController.updateLandingPageService);
router.delete("/landing/service/:id",verifyToken, landingPageServiceController.deleteLandingPageService);

module.exports = router;
