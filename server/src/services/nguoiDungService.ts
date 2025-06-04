import { RowDataPacket } from "mysql2";
import { NguoiDungDAO } from "../daos/nguoiDungDAO.js";
import { KhachHangDTO, NguoiDungDTO } from "../dtos/nguoiDungDTO.js";
import { NguoiDung } from "../models/nguoiDungModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { DiaChiService } from "./diaChiService.js";
import { DiaChi } from "../models/diaChiModel.js";
import { VaiTroNguoiDungService } from "./vaiTroNguoiDungService.js";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";

export class NguoiDungService {
  private nguoiDungDAO: NguoiDungDAO;
  private diaChiService: DiaChiService;
  private vaiTroNguoiDungService: VaiTroNguoiDungService;

  constructor () {
    this.nguoiDungDAO = new NguoiDungDAO();
    this.diaChiService = new DiaChiService();
    this.vaiTroNguoiDungService = new VaiTroNguoiDungService();
  }

  public getAllCustomer = async (page: number, limit: number, customerId: string, status: string) => {
    try {
      const rows = await this.nguoiDungDAO.getAllCustomer(page, limit, customerId, status);
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

  public getAllStaff = async (page: number, limit: number, staffId: string, status: string, roleId: string) => {
    try {
      const rows = await this.nguoiDungDAO.getAllStaff(page, limit, staffId, status, roleId);
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

  public getById = async (userId: string): Promise<NguoiDungDTO> => {
    try {
      const rows = await this.nguoiDungDAO.getById(userId) as RowDataPacket[];
      return rows[0] as NguoiDungDTO;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getCustomerById = async (customerId: string): Promise<KhachHangDTO> => {
    try {
      const rows = await this.nguoiDungDAO.getCustomerById(customerId) as RowDataPacket[];
      const customer = rows[0]
      const address = await this.diaChiService.getById(customer.maDiaChi)
      return {
        maNguoiDung: customer.maNguoiDung,
        hoTen: customer.hoTen,
        gioiTinh: customer.gioiTinh,
        ngaySinh: customer.ngaySinh,
        soDienThoai: customer.soDienThoai,
        diaChi: address,
        email: customer.email,
        hinhAnh: customer.hinhAnh,
        ngayTao: customer.ngayTao,
        ngayCapNhat: customer.ngayCapNhat,
        trangThai: customer.trangThai,
        soLuongDonHang: customer.soLuongDonHang
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public lockAccount = async (userId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.nguoiDungDAO.updateAccountStatus(userId, 0, connection)
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  public unlockAccount = async (userId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.nguoiDungDAO.updateAccountStatus(userId, 1, connection)
      connection.commit();
      return result;
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // public insertCustomer = async (customer: NguoiDung, address: DiaChi) => {
  //   const connection = await pool.getConnection();
  //   try {
  //     connection.beginTransaction();
  //     const userId = await generateUUID(10, connection, 'nguoidung', 'maNguoiDung', 'ND');
  //     let addressId = '';
  //     if ((await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa())).length > 0) {
  //       addressId = (await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa()))[0].maDiaChi;
  //     } else {
  //       addressId = await generateUUID(255, connection, 'diachi', 'maDiaChi', 'DC');
  //       await this.diaChiService.insertAddress(address, connection);
  //     }
  //     customer.setMaNguoiDung(userId);
  //     customer.setMaDiaChi(addressId);
  //     console.log(customer)
  //     const customerResult = await this.nguoiDungDAO.insertCustomer(customer, connection);

  //     const userRoleResult = await this.vaiTroNguoiDungService.insertUserRole(new VaiTroNguoiDung(customer.getMaNguoiDung(), 'VT004'));
  //     connection.commit();
  //     return {
  //       result: {customerResult, userRoleResult}
  //     };
  //   } catch (error) {
  //     connection.rollback();
  //     console.error('Error service:', error);
  //     throw error;
  //   } finally {
  //     connection.release();
  //   }
  // };
}
