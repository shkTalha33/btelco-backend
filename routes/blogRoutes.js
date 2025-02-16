const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/blogs", verifyToken, createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);

module.exports = router;
