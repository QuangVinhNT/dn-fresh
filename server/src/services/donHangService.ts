import { RowDataPacket } from "mysql2";
import { DonHangDAO } from "../daos/donHangDAO.js";
import { AnhThucPhamService } from "./anhThucPhamService.js";
import { DonHangDTO, ThucPhamDonHangDTO } from "../dtos/donHangDTO.js";
import { DiaChiService } from "./diaChiService.js";
import { ChiTietDonHangService } from "./chiTietDonHangService.js";
import { DonHang } from "../models/donHangModel.js";
import { ChiTietDonHang } from "../models/chiTietDonHangModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { DiaChi } from "../models/diaChiModel.js";

export class DonHangService {
  private donHangDAO: DonHangDAO;
  private anhThucPhamService: AnhThucPhamService;
  private chiTietDonHangService: ChiTietDonHangService;
  private diaChiService: DiaChiService;

  constructor () {
    this.donHangDAO = new DonHangDAO();
    this.anhThucPhamService = new AnhThucPhamService();
    this.diaChiService = new DiaChiService();
    this.chiTietDonHangService = new ChiTietDonHangService();
  }

  public getAll = async (page: number, limit: number, userId: string, orderId: string) => {
    try {
      const rows = await this.donHangDAO.getAll(page, limit, userId, orderId);
      const total = rows.total as RowDataPacket[];
      return {
        data: rows.data,
        total: total[0].total
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getById = async (orderId: string): Promise<DonHangDTO> => {
    try {
      const order = await this.donHangDAO.getById(orderId) as RowDataPacket[];
      const productsRaw = await this.chiTietDonHangService.getById(orderId);
      const products: ThucPhamDonHangDTO[] = await Promise.all(productsRaw.map(async (product): Promise<ThucPhamDonHangDTO> => ({
        maThucPham: product.maThucPham,
        tenThucPham: product.tenThucPham,
        soLuong: product.soLuong,
        giaTien: +product.giaTien,
        tiLeKhuyenMai: product.tiLeKhuyenMai,
        donViTinh: product.donViTinh,
        tenDanhMuc: product.tenDanhMuc,
        hinhAnh: await this.anhThucPhamService.getOneByProductId(product.maThucPham)
      })));
      const totalPrice = products.reduce((total, product) => total + +product.giaTien, 0);
      const address = await this.diaChiService.getById(order[0].maDiaChi);
      if (order.length === 0) {
        throw new Error(`No order found with ID: ${orderId}`);
      }
      return {
        maDonHang: order[0].maDonHang,
        nguoiNhan: order[0].hoTen,
        diaChiNhan: address,
        ngayTao: order[0].ngayTao,
        ngayCapNhat: order[0].ngayCapNhat,
        trangThai: order[0].trangThai,
        phuongThucThanhToan: order[0].phuongThucThanhToan,
        ghiChu: order[0].ghiChu,
        thongTinThucPham: products,
        tongTien: totalPrice
      };
    } catch (error) {
      console.error(`Service error: ${error}`);
      throw error;
    }
  };

  public getAllForAdmin = async (page: number, limit: number, orderId: string, status: string) => {
    try {
      const rows = await this.donHangDAO.getAllForAdmin(page, limit, orderId, status);
      const total = rows.total as RowDataPacket[];
      return {
        data: rows.data,
        total: total[0].total
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public insertOrder = async (order: DonHang, orderDetails: ChiTietDonHang[], address: DiaChi) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      let addressId = '';
      if ((await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa())).length > 0) {
        addressId = (await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa()))[0].maDiaChi;
      } else {
        addressId = await generateUUID(255, connection, 'diachi', 'maDiaChi', 'DC');
        address.setMaDiaChi(addressId);
        await this.diaChiService.insertAddress(address, connection);
      }
      const orderId = await generateUUID(255, connection, 'donhang', 'maDonHang', 'DH');
      order.setMaDonHang(orderId);
      order.setMaDiaChi(addressId);
      const orderResult = await this.donHangDAO.insertOrder(order, connection);
      const orderDetailResult = await Promise.all(orderDetails.map(async (orderDetail) => {
        orderDetail.setMaDonHang(orderId);
        return this.chiTietDonHangService.insert(orderDetail, connection);
      }));
      connection.commit();
      return {
        result: { orderResult, orderDetailResult }
      };
    } catch (error) {
      connection.rollback();
      console.log('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
}
