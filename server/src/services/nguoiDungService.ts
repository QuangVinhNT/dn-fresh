import { RowDataPacket } from "mysql2";
import { NguoiDungDAO } from "../daos/nguoiDungDAO.js";
import { KhachHangDTO, NguoiDungDTO, NhanVienDTO } from "../dtos/nguoiDungDTO.js";
import { NguoiDung } from "../models/nguoiDungModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { DiaChiService } from "./diaChiService.js";
import { DiaChi } from "../models/diaChiModel.js";
import { VaiTroNguoiDungService } from "./vaiTroNguoiDungService.js";
import { VaiTroNguoiDung } from "../models/vaiTroNguoiDungModel.js";
import bcrypt from 'bcrypt';

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
      const customer = rows[0];
      const address = await this.diaChiService.getById(customer.maDiaChi);
      const roleIds = await this.vaiTroNguoiDungService.getAllRoleByUserId(customer.maNguoiDung);
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
        soLuongDonHang: customer.soLuongDonHang,
        danhSachVaiTro: roleIds
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public getStaffById = async (staffId: string): Promise<NhanVienDTO> => {
    try {
      const rows = await this.nguoiDungDAO.getById(staffId) as RowDataPacket[];
      const staff = rows[0];
      const address = await this.diaChiService.getById(staff.maDiaChi);
      const roleIds = await this.vaiTroNguoiDungService.getAllRoleByUserId(staff.maNguoiDung);
      return {
        maNguoiDung: staff.maNguoiDung,
        hoTen: staff.hoTen,
        gioiTinh: staff.gioiTinh,
        ngaySinh: staff.ngaySinh,
        soDienThoai: staff.soDienThoai,
        diaChi: address,
        email: staff.email,
        hinhAnh: staff.hinhAnh,
        ngayTao: staff.ngayTao,
        ngayCapNhat: staff.ngayCapNhat,
        trangThai: staff.trangThai,
        danhSachVaiTro: roleIds
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
      const result = await this.nguoiDungDAO.updateAccountStatus(userId, 0, connection);
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

  public unlockAccount = async (userId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.nguoiDungDAO.updateAccountStatus(userId, 1, connection);
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

  public insertUser = async (user: NguoiDung, address: DiaChi, roleId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const userId = await generateUUID(10, connection, 'nguoidung', 'maNguoiDung', 'ND');
      let addressId = '';
      if ((await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa())).length > 0) {
        addressId = (await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa()))[0].maDiaChi;
      } else {
        addressId = await generateUUID(255, connection, 'diachi', 'maDiaChi', 'DC');
        address.setMaDiaChi(addressId)
        await this.diaChiService.insertAddress(address, connection);
      }
      user.setMaNguoiDung(userId);
      user.setMaDiaChi(addressId);
      const rawPassword = user.getMatKhau();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
      user.setMatKhau(hashedPassword);
      const userResult = await this.nguoiDungDAO.insertUser(user, connection);
      const userRoleResult = await this.vaiTroNguoiDungService.insertUserRole(new VaiTroNguoiDung(user.getMaNguoiDung(), roleId), connection);
      connection.commit();
      return { userResult, userRoleResult };
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };
}
