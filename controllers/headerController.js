const Header = require("../models/header");

// Create a new header (only if the category does not exist)
exports.createHeader = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    // Check if the category already exists
    const existingHeader = await Header.findOne({ category });

    if (existingHeader) {
      return res.status(400).json({
        success: false,
        message: "Category already exists. Use update instead.",
      });
    }

    // Create a new header
    const newHeader = new Header({ title, description, category, image });
    await newHeader.save();

    res.status(201).json({
      success: true,
      message: "Header section created successfully",
      header: newHeader,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing header (only if the category exists)
exports.updateHeader = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    // Check if the category exists
    const existingHeader = await Header.findOne({ category });

    if (!existingHeader) {
      return res.status(404).json({
        success: false,
        message: "Header section not found. Create it first.",
      });
    }

    // Update the existing header
    existingHeader.title = title;
    existingHeader.description = description;
    existingHeader.image = image;
    await existingHeader.save();

    res.status(200).json({
      success: true,
      message: "Header section updated successfully",
      header: existingHeader,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllHeaders = async (req, res) => {
  try {
    const headers = await Header.find(); // Fetch all headers

    if (!headers || headers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No headers found" });
    }

    res.status(200).json({ success: true, headers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHeaderByType = async (req, res) => {
  try {
    const header = await Header.findOne({ category: req.params.category });

    if (!header)
      return res
        .status(404)
        .json({ success: false, message: "Header section not found" });

    res.status(200).json({ success: true, header });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteHeaderByType = async (req, res) => {
  try {
    const deletedHeader = await Header.findOneAndDelete({
      category: req.params.category,
    });

    if (!deletedHeader)
      return res
        .status(404)
        .json({ success: false, message: "Header section not found" });

    res
      .status(200)
      .json({ success: true, message: "Header section deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
