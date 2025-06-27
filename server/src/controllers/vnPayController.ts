import { Request, Response } from "express";
import { DonHang } from "../models/donHangModel.js";
import { ChiTietDonHang } from "../models/chiTietDonHangModel.js";
import { DiaChi } from "../models/diaChiModel.js";
import { DonHangService } from "../services/donHangService.js";
import { sortObject } from "../utils/vnPay.js";
import crypto from 'crypto';
import querystring from 'qs';

export class VnPayController {
  private donHangService: DonHangService;

  constructor () {
    this.donHangService = new DonHangService();
  }

  public paymentVnPay = async (req: Request, res: Response) => {
    try {
      const vnpayConfig = {
        vnp_TmnCode: 'DL1KKR66', // Sử dụng mã test chính thức
        vnp_HashSecret: 'H3ZG3PQET8JAKDHBEDY8VKXIBMHU7NS6', // Hash secret test chính thức
        vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        vnp_Api: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
        vnp_ReturnUrl: 'http://localhost:8080/payment/vnpay-return'
      };

      const date = new Date();
      const createDate = `${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date
          .getHours()
          .toString()
          .padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date
            .getSeconds()
            .toString()
            .padStart(2, '0')}`;

      // Tạo orderId unique
      const orderId = `${Date.now()}`;

      // Lấy IP address
      const ipAddr = (req.headers['x-forwarded-for'] as string) ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        '127.0.0.1';

      let vnp_Params: any = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: vnpayConfig.vnp_TmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: 'ThanhToan_1750847794391',
        vnp_OrderType: 'other', // ✅ Sửa từ 'order-type'
        vnp_Amount: 400 * 100, // 400 VND
        vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
        vnp_IpAddr: '127.0.0.1',
        vnp_CreateDate: createDate,
      };

      // Sắp xếp parameters
      vnp_Params = sortObject(vnp_Params);

      // Tạo query string
      const queryString = querystring.stringify(vnp_Params, { encode: false });

      // Tạo secure hash
      const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
      const signed = hmac.update(Buffer.from(queryString, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;

      // Tạo payment URL
      const paymentUrl = vnpayConfig.vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });

      console.log('Payment URL:', paymentUrl);
      console.log('Secure Hash:', signed);

      res.json({
        success: true,
        paymentUrl,
        orderId
      });

    } catch (error) {
      console.error('Error creating VNPay URL:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tạo URL thanh toán'
      });
    }
  };

  public checkResultPayment = async (req: Request, res: Response) => {
    // let vnp_Params = req.query;
    // const secretKey = 'H3ZG3PQET8JAKDHBEDY8VKXIBMHU7NS6';

    // // Step 1: Lưu lại secure hash rồi xóa nó khỏi object
    // let secureHash = vnp_Params['vnp_SecureHash'];
    // delete vnp_Params['vnp_SecureHash'];
    // delete vnp_Params['vnp_SecureHashType'];

    // // Step 2: Sắp xếp tham số
    // vnp_Params = sortObject(vnp_Params);

    // // Step 3: Tạo chuỗi signData
    // const signData = QueryString.stringify(vnp_Params, { encode: false });

    // // Step 4: Tạo hash từ signData
    // const hmac = crypto.createHmac('sha512', secretKey);
    // const signed = hmac.update(signData).digest('hex');

    // // Step 5: So sánh
    // if (secureHash === signed) {
    //   console.log('Thanh toán thành công!');
    // } else {
    //   console.log('Sai chữ ký!');
    // }
  };
}
