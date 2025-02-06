const mongoose = require("mongoose");

const headerSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, unique: true }, // Unique type (e.g., "home", "about")
    image: { type: String, required: true }
});

module.exports = mongoose.model("HeaderSection", headerSectionSchema);
