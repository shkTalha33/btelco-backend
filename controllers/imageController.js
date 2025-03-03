const { uploadOnCloudinary } = require("../utils/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);
    
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Upload to Cloudinary failed" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      image: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { uploadImage };
