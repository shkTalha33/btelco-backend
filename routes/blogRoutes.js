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

router.post("/blogs", upload.single("image"), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", upload.single("image"), updateBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
