import { PoolConnection } from "mysql2/promise";
import { pool } from "../configs/database.js";
import { NguoiDung } from "../models/nguoiDungModel.js";

export class NguoiDungDAO {

  public getAllCustomer = async (page: number, limit: number, customerId: string, status: string) => {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await pool.query(`
        SELECT nguoidung.maNguoiDung, hoTen, ngaySinh, gioiTinh, email, trangThai, ngayTao
        FROM nguoidung
        JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro = 'VT004' 
        ${customerId.length > 0 ? `AND BINARY LOWER(nguoidung.maNguoiDung) LIKE LOWER('%${customerId}%')` : ''}
        ${status.length > 0 ? `AND trangThai IN (${status})` : ''}
        ORDER BY hoTen ASC
        LIMIT ? OFFSET ?
      `, [limit, offset]);

      const [total] = await pool.query(`
        SELECT COUNT(DISTINCT nguoidung.maNguoiDung) as total
        FROM nguoidung
        JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro = 'VT004' ${customerId.length > 0 ? `AND BINARY LOWER(nguoidung.maNguoiDung) LIKE LOWER('%${customerId}%')` : ''}
      `);

      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  public getAllStaff = async (page: number, limit: number, staffId: string, status: string, roleId: string) => {
    const offset = (page - 1) * limit;
    const whereClause = [
      staffId.length > 0 ? `BINARY LOWER(nguoidung.maNguoiDung) LIKE LOWER('%${staffId}%')` : '',
      status.length > 0 ? `trangThai IN (${status})` : ''
    ].filter(item => item.length > 0).join(' AND ');
    try {
      const [rows] = await pool.query(`
        SELECT nguoidung.maNguoiDung, hoTen, ngaySinh, gioiTinh, trangThai, maVaiTro, ngayTao
        FROM nguoidung
        INNER JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro IN (${roleId.length > 0 ? roleId : "'VT001', 'VT002', 'VT003'"})
        ${whereClause.length > 0 ? `AND ${whereClause}` : ''}
        LIMIT ? OFFSET ?
      `, [limit, offset]);

      const [total] = await pool.query(`
        SELECT COUNT(DISTINCT nguoidung.maNguoiDung) as total
        FROM nguoidung
        JOIN vaitronguoidung ON nguoidung.maNguoiDung = vaitronguoidung.maNguoiDung
        WHERE maVaiTro IN (${roleId.length > 0 ? roleId : "'VT001', 'VT002', 'VT003'"})
        ${whereClause.length > 0 ? `AND ${whereClause}` : ''}
      `);

      return {
        data: rows,
        total,
      };
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  public getById = async (userId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT *
        FROM nguoidung
        WHERE maNguoiDung = ?
        `, [userId])
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  public getCustomerById = async (customerId: string) => {
    try {
      const [rows] = await pool.query(`
        SELECT kh.maNguoiDung, hoTen, gioiTinh, ngaySinh, soDienThoai, kh.maDiaChi, email, hinhAnh, kh.ngayTao, kh.ngayCapNhat, kh.trangThai, COUNT(dh.maDonHang) as soLuongDonHang
        FROM nguoidung AS kh
        LEFT JOIN donhang AS dh ON dh.maKhachHang = kh.maNguoiDung
        WHERE kh.maNguoiDung = ?
        GROUP BY kh.maNguoiDung
        `, [customerId])
      return rows;
    } catch (error) {
      console.error('DAO error:', error);
      throw error;
    }
  }

  // public insertCustomer = async (customer: NguoiDung, connection: PoolConnection) => {
  //   try {
  //     const dob = `${customer.getNgaySinh().getFullYear()}-${customer.getNgaySinh().getMonth()}-${customer.getNgaySinh().getDay()}`
  //     const [result] = await connection.query(`
  //       INSERT INTO nguoidung (maNguoiDung, hoTen, gioiTinh, ngaySinh, soDienThoai, maDiaChi, email, matKhau, hinhAnh, ngayTao, ngayCapNhat, trangThai)
  //       VALUES (?, ?, ?, '${dob}', ?, ?, ?, 'Dnfresh123@', ?, NOW(), NOW(), 1)
  //       `, [customer.getMaNguoiDung(), customer.getHoTen(), customer.getGioiTinh(), customer.getSoDienThoai(), customer.getMaDiaChi(), customer.getEmail(), customer.getHinhAnh()])
  //     return result;
  //   } catch (error) {
  //     console.error('DAO error:', error);
  //     throw error;
  //   }
  // }
}
