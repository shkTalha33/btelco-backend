const BlogCategory = require("../models/blogCategory");

// Create BlogCategory
exports.createBlogCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Category Title is required" });

        const newCategory = new BlogCategory({ title });
        await newCategory.save();
        return res.status(201).json({
            success: true,
            message: "Blog Category created successfully",
            category: newCategory,
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All BlogCategories
exports.getAllBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find();
        res.status(200).json({success: true, categories});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single BlogCategory
exports.getBlogCategoryById = async (req, res) => {
    try {
        const category = await BlogCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "BlogCategory not found" });

        res.status(200).json({success: true, category});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update BlogCategory
exports.updateBlogCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Category Title is required" });

        const updatedCategory = await BlogCategory.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) return res.status(404).json({ message: "Blog Category not found" });
        return res.status(200).json({
            success: true,
            message: "Blog Category updated successfully",
            category: updatedCategory,
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete BlogCategory
exports.deleteBlogCategory = async (req, res) => {
    try {
        const deletedCategory = await BlogCategory.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Blog Category not found" });

        res.status(200).json({ message: "Blog Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
