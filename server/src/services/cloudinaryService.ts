import cloudinary from "../configs/cloudinary.js";
import fs from 'fs';

const uploadToCloudinary = async (filePath: string, folder: string = 'uploads') => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    console.error('Cloudinary service error:', error);
    throw error;
  }
};


export {
  uploadToCloudinary
}
