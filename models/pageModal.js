const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        enum: ["about", "contact", "blog"], 
        required: true, 
        unique: true
    },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Page", pageSchema);
