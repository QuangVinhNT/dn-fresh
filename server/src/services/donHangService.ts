import { RowDataPacket } from "mysql2";
import { DonHangDAO } from "../daos/donHangDAO.js";
import { AnhThucPhamService } from "./anhThucPhamService.js";
import { DonHangAdminDTO, DonHangDTO, ThucPhamDonHangDTO } from "../dtos/donHangDTO.js";
import { DiaChiService } from "./diaChiService.js";
import { ChiTietDonHangService } from "./chiTietDonHangService.js";
import { DonHang } from "../models/donHangModel.js";
import { ChiTietDonHang } from "../models/chiTietDonHangModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { DiaChi } from "../models/diaChiModel.js";
import { NguoiDungService } from "./nguoiDungService.js";

export class DonHangService {
  private donHangDAO: DonHangDAO;
  private anhThucPhamService: AnhThucPhamService;
  private chiTietDonHangService: ChiTietDonHangService;
  private diaChiService: DiaChiService;
  private nguoiDungService: NguoiDungService;

  constructor () {
    this.donHangDAO = new DonHangDAO();
    this.anhThucPhamService = new AnhThucPhamService();
    this.diaChiService = new DiaChiService();
    this.chiTietDonHangService = new ChiTietDonHangService();
    this.nguoiDungService = new NguoiDungService();
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
      const order = (await this.donHangDAO.getById(orderId) as RowDataPacket[])[0];
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
      const address = await this.diaChiService.getById(order.maDiaChi);
      if (order.length === 0) {
        throw new Error(`No order found with ID: ${orderId}`);
      }
      return {
        maDonHang: order.maDonHang,
        nguoiNhan: order.hoTen,
        diaChiNhan: address,
        ngayTao: order.ngayTao,
        ngayCapNhat: order.ngayCapNhat,
        trangThai: order.trangThai,
        phuongThucThanhToan: order.phuongThucThanhToan,
        ghiChu: order.ghiChu,
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

  public getAllForDeliveryStaff = async (page: number, limit: number, orderId: string, status: string, communeId: string) => {
    try {
      const rows = await this.donHangDAO.getAllForDeliveryStaff(page, limit, orderId, status, communeId);
      const total = rows.total as RowDataPacket[];
      return {
        data: rows.data,
        total: total[0].total
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  }

  public getAllOrderForInventoryStaff = async () => {
    try {
      const orderIds = await this.donHangDAO.getOrderIdsForInventoryStaff() as RowDataPacket[];
      const orders = await Promise.all(orderIds.map(async (orderId) => ({
        maDonHang: orderId.maDonHang,
        danhSachThucPham: (await this.chiTietDonHangService.getById(orderId.maDonHang) as RowDataPacket[]).map(product => ({
          maThucPham: product.maThucPham,
          tenThucPham: product.tenThucPham,
          soLuong: product.soLuong,
          donViTinh: product.donViTinh
        })) 
      })));
      return orders;
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

  public getByIdForAdmin = async (orderId: string): Promise<DonHangAdminDTO> => {
    try {
      const order = (await this.donHangDAO.getByIdForAdmin(orderId) as RowDataPacket[])[0];
      const customer = await this.nguoiDungService.getById(order.maKhachHang);
      const staff = await this.nguoiDungService.getById(order.maNhanVien);
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
      const address = await this.diaChiService.getById(order.maDiaChi);
      return {
        maDonHang: order.maDonHang,
        thongTinKhachHang: {
          maNguoiDung: customer.maNguoiDung,
          hoTen: customer.hoTen,
          gioiTinh: customer.gioiTinh,
          soDienThoai: customer.soDienThoai,
          email: customer.email,
          diaChi: await this.diaChiService.getById(customer.maDiaChi)
        },
        diaChiNhan: address,
        thongTinNhanVien: {
          maNguoiDung: staff?.maNguoiDung || '',
          hoTen: staff?.hoTen || ''
        },
        maPhieuXuat: order.maPhieuXuat ?? '',
        trangThai: order.trangThai,
        ngayTao: order.ngayTao,
        ngayCapNhat: order.ngayCapNhat,
        ghiChu: order.ghiChu,
        phuongThucThanhToan: order.phuongThucThanhToan,
        thongTinThucPham: products,
        tongTien: totalPrice
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public confirmPack = async (orderId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.donHangDAO.changeStatus(orderId, '', 2, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public confirmExport = async (orderId: string, staffId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = this.donHangDAO.changeStatus(orderId, staffId, 3, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public confirmFinish = async (orderId: string, staffId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.donHangDAO.changeStatus(orderId, staffId, 4, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public cancelOrder = async (orderId: string, staffId: string, note: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.donHangDAO.cancelOrder(orderId, staffId, note, connection);
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
}
