import { Request, Response, Router } from "express";
import { VnPayController } from "../controllers/vnpayController.js";

const vnPayRoutes = Router();
const vnPayController = new VnPayController();

vnPayRoutes.post('/', (req: Request, res: Response) => {
  return vnPayController.paymentVnPay(req, res);
});

vnPayRoutes.get('/check', (req: Request, res: Response) => {
  return vnPayController.checkResultPayment(req, res);
});

export default vnPayRoutes;
