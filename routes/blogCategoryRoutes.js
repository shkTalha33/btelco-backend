const express = require("express");
const {
    createBlogCategory,
    getAllBlogCategories,
    getBlogCategoryById,
    updateBlogCategory,
    deleteBlogCategory
} = require("../controllers/blogCategoryController");

const router = express.Router();

router.post("/blog/category", createBlogCategory);
router.get("/blog/category", getAllBlogCategories);
router.get("/blog/category/:id", getBlogCategoryById);
router.put("/blog/category/:id", updateBlogCategory);
router.delete("/blog/category/:id", deleteBlogCategory);

module.exports = router;
