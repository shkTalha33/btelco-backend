const express = require("express");
const {
    createServiceCategory,
    getAllServiceCategories,
    getServiceCategoryById,
    updateServiceCategory,
    deleteServiceCategory
} = require("../controllers/serviceCategoryController");

const router = express.Router();

router.post("/service/category", createServiceCategory);
router.get("/service/category", getAllServiceCategories);
router.get("/service/category/:id", getServiceCategoryById);
router.put("/service/category/:id", updateServiceCategory);
router.delete("/service/category/:id", deleteServiceCategory);

module.exports = router;
