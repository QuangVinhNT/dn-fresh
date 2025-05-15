import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";

const uploadRoutes = Router();

uploadRoutes.post('/', upload.array('files', 4), uploadFile)

export default uploadRoutes
