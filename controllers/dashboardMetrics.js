const Quote = require("../models/quote");
const LandingPageService = require("../models/landingPageService");
const Blog = require("../models/blog");
const Service = require("../models/service");

const getMetrics = async (req, res) => {
  try {
    // Get the count of quotes sent
    const totalQuotes = await Quote.countDocuments();

    // Get the count of landing page services
    const totalLandingServices = await LandingPageService.countDocuments();

    // Get the count of blogs
    const totalBlogs = await Blog.countDocuments();

    // Get the count of services
    const totalServices = await Service.countDocuments();

    // Send the metrics as a response
    res.status(200).json({
      success: true,
      metrics: {
        totalQuotes,
        totalLandingServices,
        totalBlogs,
        totalServices
      }
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching metrics"
    });
  }
};

module.exports = { getMetrics };
