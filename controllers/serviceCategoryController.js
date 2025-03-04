const ServiceCategory = require("../models/serviceCategory");

// Create ServiceCategory
exports.createServiceCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: " Category Title is required" });

        const newCategory = new ServiceCategory({ title });
        await newCategory.save();
        return res.status(201).json({
            success: true,
            message: "Service Category created successfully",
            category: newCategory,
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All ServiceCategories
exports.getAllServiceCategories = async (req, res) => {
    try {
        const categories = await ServiceCategory.find().sort({ name: 1 }); // Sorting by name in ascending order
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Single ServiceCategory
exports.getServiceCategoryById = async (req, res) => {
    try {
        const category = await ServiceCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "ServiceCategory not found" });

        res.status(200).json({success: true, category});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update ServiceCategory
exports.updateServiceCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Category Title is required" });

        const updatedCategory = await ServiceCategory.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) return res.status(404).json({ message: "ServiceCategory not found" });

        return res.status(200).json({
            success: true,
            message: "Service Category updated successfully",
            category: updatedCategory,
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete ServiceCategory
exports.deleteServiceCategory = async (req, res) => {
    try {
        const deletedCategory = await ServiceCategory.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "ServiceCategory not found" });

        res.status(200).json({ message: "Service Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
