import { Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinaryService.js";
import fs from 'fs'

const uploadFile = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    console.log(files)
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'File not found!' });
    } else {
      // const uploadPromises = files.map(file => uploadToCloudinary(file.path));
      const results = []
      for (const file of files) {
        const result = await uploadToCloudinary(file.path);
        results.push(result)
      }
      res.json(results.map(result => ({
        url: result.secure_url,
        type: result.resource_type,
      })));
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  uploadFile
};
