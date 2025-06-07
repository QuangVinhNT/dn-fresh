import cloudinary from "../configs/cloudinary.js";
import fs from 'fs';

const uploadToCloudinary = async (filePath: string, mimetype: string, folder: string = 'uploads') => {
  let resource_type: 'image' | 'raw' | 'video' | 'auto' = 'auto';

  if (mimetype.startsWith('image/')) {
    resource_type = 'image';
  } else if (mimetype === 'application/pdf') {
    resource_type = 'raw';
  } else if (mimetype.startsWith('video/')) {
    resource_type = 'video';
  }

  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder,
      resource_type: 'auto'
    });
    return result;
  } catch (error) {
    console.error('Cloudinary service error:', error);
    throw error;
  }
};


export {
  uploadToCloudinary
}
