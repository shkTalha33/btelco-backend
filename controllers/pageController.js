const Page = require("../models/pageModal");

// Create a Static Page (If Not Exists)
exports.createPage = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    // Validate category
    if (!["about", "contact", "blog"].includes(category)) {
      return res
        .status(400)
        .json({
          message: "Invalid category. Use 'about', 'contact', or 'blog'.",
        });
    }

    // Check if the category already exists
    let existingPage = await Page.findOne({ category });

    if (existingPage) {
      return res.status(400).json({
        message: "Page Header is  already exists",
      });
    }

    const page = new Page({ title, description, category, image });
    await page.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Page Header created successfully",
        page,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Existing Page
exports.updatePage = async (req, res) => {
    try {
      const { title, description, category, image } = req.body;
  
      // Check if the page exists
      let page = await Page.findOne({ category });
  
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
  
      // Update fields
      page.title = title || page.title;
      page.description = description || page.description;
      page.image = image || page.image;
  
      // Save the updated page
      await page.save();
  
      res.status(200).json({
        success: true,
        message: "Page updated successfully",
        page,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  ;

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json({ success: true, pages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single page by category
exports.getPageByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = await Page.findOne({ category });

    if (!page) return res.status(404).json({ message: "Page not found" });

    res.status(200).json({ success: true, page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a page
exports.deletePage = async (req, res) => {
  try {
    const { category } = req.params;
    const page = await Page.findOne({ category });

    if (!page) return res.status(404).json({ message: "Page not found" });

    await Page.deleteOne({ category });
    res
      .status(200)
      .json({ success: true, message: "Page Header deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
