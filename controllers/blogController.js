const Blog = require("../models/blog");
const { uploadOnCloudinary } = require("../utils/cloudinary"); // Import Cloudinary function
const fs = require("fs");

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, description, category, image } = req.body;

        // Validate required fields
        if (!title || !description || !category || !image) {
            return res.status(400).json({ success: false, message: "All fields are required: title, description, category, and image." });
        }

        const newBlog = new Blog({ title, description, category, image });
        await newBlog.save();

        res.status(201).json({ success: true, message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    try {
        const { title, description, category, image } = req.body;

        // Validate required fields
        if (!title || !description || !category || !image) {
            return res.status(400).json({ success: false, message: "All fields are required: title, description, category, and image." });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, description, category, image },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Export functions
module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
