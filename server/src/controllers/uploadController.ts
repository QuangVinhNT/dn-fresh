import { Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinaryService.js";
import fs from 'fs';

const uploadFile = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    console.log(files);
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'File not found!' });
    } else {
      const results = [];
      for (const file of files) {
        const result = await uploadToCloudinary(file.path, file.mimetype);
        results.push(result);
      }
      console.log(results);
      res.json(results.map(result => ({
        url: result.secure_url,
        // result.resource_type === 'image'
        //   ? result.secure_url
        //   : result.secure_url.replace('/upload/', '/upload/fl_attachment/'),
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
