const { uploadOnCloudinary } = require("../utils/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log(req.body)
    console.log(req.file)

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Upload to Cloudinary failed" });
    }

    // Send the Cloudinary image URL to the frontend
    res.status(200).json({ 
      message: "Image uploaded successfully", 
      image: cloudinaryResponse.secure_url 
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { uploadImage };
