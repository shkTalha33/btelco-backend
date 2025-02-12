const Header = require("../models/header");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.createOrUpdateHeader = async (req, res) => {
    try {
        const { title, description, type, image } = req.body

        const updatedHeader = await Header.findOneAndUpdate(
            { type }, // Search by type (if exists, update)
            { title, description, image },
            { new: true, upsert: true } // Update if exists, else create new
        );

        res.status(200).json({
            success: true,
            message: "Header section updated successfully",
            header: updatedHeader
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllHeaders = async (req, res) => {
    try {
        const headers = await Header.find(); // Fetch all headers

        if (!headers || headers.length === 0) {
            return res.status(404).json({ success: false, message: "No headers found" });
        }

        res.status(200).json({ success: true, headers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getHeaderByType = async (req, res) => {
    try {
        const header = await Header.findOne({ type: req.params.type });

        if (!header) return res.status(404).json({ success: false, message: "Header section not found" });

        res.status(200).json({ success: true, header });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteHeaderByType = async (req, res) => {
    try {
        const deletedHeader = await Header.findOneAndDelete({ type: req.params.type });

        if (!deletedHeader) return res.status(404).json({ success: false, message: "Header section not found" });

        res.status(200).json({ success: true, message: "Header section deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
