const Service = require("../models/service");
// Create a new service
exports.createService = async (req, res) => {
    try {
        const { title, description, category, image } = req.body;

        const service = new Service({ title, description, category, image });
        await service.save();

        res.status(201).json({ success: true, message: "Service created successfully", service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all services
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({success: true, services});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single service
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        res.status(200).json({success: true, service});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    try {
        const { title, description, category, image } = req.body;
        let updatedData = { title, description, category, image };

        const service = await Service.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!service) return res.status(404).json({ message: "Service not found" });

        res.status(200).json({ success: true, message: "Service updated successfully", service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
