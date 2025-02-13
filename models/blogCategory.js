const mongoose = require("mongoose");

const BlogCategorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("BlogCategory", BlogCategorySchema);
