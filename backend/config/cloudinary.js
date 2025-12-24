import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  try {
    // ✅ check if filepath exists
    if (!filepath || !fs.existsSync(filepath)) {
      console.log("File does not exist:", filepath);
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(filepath, {
      resource_type: "image",
    });

    // ✅ delete local file after upload
    fs.unlinkSync(filepath);

    return uploadResult.secure_url;
  } catch (error) {
    // ✅ cleanup on error
    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
