const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("ServiceCategory", ServiceCategorySchema);
