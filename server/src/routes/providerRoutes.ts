import { Router } from "express";
import { getAllProviderName } from "../controllers/providerController.js";

const providerRoutes = Router();

providerRoutes.get('/names', getAllProviderName);

export default providerRoutes;
