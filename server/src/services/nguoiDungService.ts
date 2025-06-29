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
import { generateToken, verifyToken } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/mailer.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken";

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
        address.setMaDiaChi(addressId);
        await this.diaChiService.insertAddress(address, connection);
      }
      user.setMaNguoiDung(userId);
      user.setMaDiaChi(addressId);
      const rawPassword = user.getMatKhau();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
      user.setMatKhau(hashedPassword);
      const userResult = await this.nguoiDungDAO.insertUser(user, connection);
      const userRoleResult = await Promise.all([
        await this.vaiTroNguoiDungService.insertUserRole(new VaiTroNguoiDung(user.getMaNguoiDung(), roleId), connection),
        await this.vaiTroNguoiDungService.insertUserRole(new VaiTroNguoiDung(user.getMaNguoiDung(), 'VT004'), connection)
      ]);
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

  public updateUser = async (user: NguoiDung, address: DiaChi) => {
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
      user.setMaDiaChi(addressId);
      if (user.getMatKhau().length > 0) {
        const rawPassword = user.getMatKhau();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
        user.setMatKhau(hashedPassword);
      }
      const result = await this.nguoiDungDAO.updateUser(user, connection);
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

  public login = async (email: string, password: string) => {
    try {
      const user = (await this.nguoiDungDAO.getByEmail(email) as RowDataPacket[])[0];
      if (!user) throw new UnauthorizedError('Email không tồn tại!');
      const match = await bcrypt.compare(password, user.matKhau);
      if (!match) throw new UnauthorizedError('Mật khẩu sai!');
      const userRole = await this.vaiTroNguoiDungService.getAllRoleByUserId(user.maNguoiDung);
      return {
        maNguoiDung: user.maNguoiDung,
        hoTen: user.hoTen,
        email: user.email,
        hinhAnh: user.hinhAnh,
        danhSachVaiTro: userRole
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public createTokenForRole = (userId: string, roleId: string) => {
    return generateToken({ id: userId, roleId });
  };

  public register = async (user: NguoiDung, address: DiaChi) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const userId = await generateUUID(10, connection, 'nguoidung', 'maNguoiDung', 'ND');
      let addressId = '';
      if ((await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa())).length > 0) {
        addressId = (await this.diaChiService.getIdByTheRestField(address.getChiTietDiaChi(), address.getMaPhuongXa()))[0].maDiaChi;
      } else {
        addressId = await generateUUID(255, connection, 'diachi', 'maDiaChi', 'DC');
        address.setMaDiaChi(addressId);
        await this.diaChiService.insertAddress(address, connection);
      }
      user.setMaNguoiDung(userId);
      user.setMaDiaChi(addressId);
      const rawPassword = user.getMatKhau();
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
      user.setMatKhau(hashedPassword);
      const userResult = await this.nguoiDungDAO.insertUser(user, connection);
      const userRoleResult = await this.vaiTroNguoiDungService.insertUserRole(new VaiTroNguoiDung(user.getMaNguoiDung(), 'VT004'), connection);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const tokenPayload = {
        email: user.getEmail(),
        code
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '5m' });
      await sendVerificationEmail(user.getEmail(), code);
      connection.commit();
      return { userResult, userRoleResult, message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh.', token };
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public verifyEmail = async (email: string, code: string, token: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const user = (await this.nguoiDungDAO.getByEmail(email) as RowDataPacket[])[0];
      if (!user) throw new UnauthorizedError('Email không tồn tại!');
      const decoded = verifyToken(token);
      if (decoded.email !== email || decoded.code !== code) {
        throw new Error("Mã xác nhận không đúng hoặc đã hết hạn");
      }
      const updateStatusResult = await this.nguoiDungDAO.updateAccountStatus(user.maNguoiDung, 1, connection);
      connection.commit();
      return { updateStatusResult };
    } catch (error) {
      connection.rollback();
      console.error('Error service:', error);
      throw error;
    } finally {
      connection.release();
    }
  };

  public async forgotPassword(email: string) {
    try {
      const user = (await this.nguoiDungDAO.getByEmail(email) as RowDataPacket[])[0];
      if (!user) throw new UnauthorizedError('Email không tồn tại!');

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const token = jwt.sign({ email, code }, process.env.JWT_SECRET!, { expiresIn: '5m' });
      await sendVerificationEmail(email, code);
      return token;
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  }

  public async verifyCodeAndResetPassword(
    token: string,
    email: string,
    code: string,
    newPassword: string
  ) {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const decoded = verifyToken(token);

      if (decoded.email !== email) {
        throw new UnauthorizedError('Email không khớp với token');
      }
      if (decoded.code !== code) {
        throw new UnauthorizedError('Mã xác nhận không đúng');
      }

      const user = (await this.nguoiDungDAO.getByEmail(email) as RowDataPacket[])[0];
      if (!user) {
        throw new UnauthorizedError('Email không tồn tại');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.nguoiDungDAO.updatePassword(user.maNguoiDung, hashedPassword, connection);
      connection.commit();
      return { message: "Đổi mật khẩu thành công" };
    } catch (error) {
      connection.rollback();
      console.error('Error reset password:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}
