const { uploadOnCloudinary } = require("../utils/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("req.file", req.file);

    const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);
    
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Upload to Cloudinary failed" });
    }

    console.log("cloudinaryResponse", cloudinaryResponse);

    res.status(200).json({
      message: "Image uploaded successfully",
      image: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { uploadImage };
