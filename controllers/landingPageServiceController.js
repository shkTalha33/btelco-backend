const LandingPageService = require("../models/landingPageService");

// Create a new landing page service
exports.createLandingPageService = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    // Check if any required field is missing
    if (!title || !description || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: title, description, category, and image",
      });
    }

    const service = new LandingPageService({ title, description, category, image });
    await service.save();

    res.status(201).json({
      success: true,
      message: "Landing page service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all landing page services
exports.getAllLandingPageServices = async (req, res) => {
  try {
    const services = await LandingPageService.find();

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single landing page service by ID
exports.getLandingPageServiceById = async (req, res) => {
  try {
    const service = await LandingPageService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Landing page service not found" });
    }

    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a landing page service
exports.updateLandingPageService = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    // Check if any required field is missing
    if (!title || !description || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: title, description, category, and image",
      });
    }

    const updatedService = await LandingPageService.findByIdAndUpdate(
      req.params.id,
      { title, description, category, image },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ success: false, message: "Landing page service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Landing page service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a landing page service
exports.deleteLandingPageService = async (req, res) => {
  try {
    const service = await LandingPageService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Landing page service not found" });
    }

    await LandingPageService.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Landing page service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
