import { RowDataPacket } from "mysql2";
import { NhaCungCapDAO } from "../daos/nhaCungCapDAO.js";
import { NhaCungCap } from "../models/nhaCungCapModel.js";
import { pool } from "../configs/database.js";
import generateUUID from "../utils/generateUUID.js";
import { DiaChiService } from "./diaChiService.js";
import { DiaChi } from "../models/diaChiModel.js";
import { ChiTietNhaCungCapDTO } from "../dtos/nhaCungCapDTO.js";
import { DanhMucService } from "./danhMucService.js";
import { ChiTietThucPhamNhapService } from "./chiTietThucPhamNhapService.js";

export class NhaCungCapService {
  private nhaCungCapDAO: NhaCungCapDAO;
  private diaChiService: DiaChiService;
  private danhMucService: DanhMucService;
  private chiTietThucPhamNhapService: ChiTietThucPhamNhapService;

  constructor () {
    this.nhaCungCapDAO = new NhaCungCapDAO();
    this.diaChiService = new DiaChiService();
    this.danhMucService = new DanhMucService();
    this.chiTietThucPhamNhapService = new ChiTietThucPhamNhapService();
  }

  public getAll = async (page: number, limit: number, providerName: string, status: string) => {
    try {
      const rows = await this.nhaCungCapDAO.getAll(page, limit, providerName, status);
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

  public insertProvider = async (provider: NhaCungCap, address: DiaChi) => {
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
      const providerId = await generateUUID(6, connection, 'nhacungcap', 'maNhaCungCap', 'NCC');
      provider.setMaNhaCungCap(providerId);
      provider.setMaDiaChi(addressId);
      const result = await this.nhaCungCapDAO.insertProvider(provider, connection);
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

  public getById = async (providerId: string): Promise<ChiTietNhaCungCapDTO> => {
    try {
      const rows = await this.nhaCungCapDAO.getById(providerId) as RowDataPacket[];
      const provider = rows[0];
      const categories = (await this.danhMucService.getAllByProviderId(providerId)).map(category => category.tenDanhMuc).join(', ');
      const products = (await this.chiTietThucPhamNhapService.getAllByProviderId(providerId)).map(product => ({
        maThucPham: product.maThucPham,
        tenThucPham: product.tenThucPham,
        soLuong: product.tongSoLuong
      }));
      const address = await this.diaChiService.getById(provider.maDiaChi);
      const addressDetail = await this.diaChiService.getDetailById(provider.maDiaChi)
      return {
        maNhaCungCap: provider.maNhaCungCap,
        tenNhaCungCap: provider.tenNhaCungCap,
        moTa: provider.moTa,
        ngayThanhLap: provider.ngayThanhLap,
        ngayDangKy: provider.ngayDangKy,
        diaChi: address,
        trangThaiHoatDong: provider.trangThaiHoatDong,
        giayToPhapLy: provider.giayToPhapLy,
        ngayCapNhat: provider.ngayCapNhat,
        danhMucCungCap: categories,
        thucPhamCungCap: products,
        chiTietDiaChi: addressDetail.chiTietDiaChi,
        maPhuongXa: addressDetail.maPhuongXa,
        maTinhThanhPho: addressDetail.maTinhThanhPho
      };
    } catch (error) {
      console.error('Error service:', error);
      throw error;
    }
  };

  public deleteProvider = async (providerId: string) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const result = await this.nhaCungCapDAO.deleteProvider(providerId, connection);
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

  public updateProvider = async (provider: NhaCungCap, address: DiaChi) => {
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
      provider.setMaDiaChi(addressId)
      const result = await this.nhaCungCapDAO.updateProvider(provider, connection)
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
}
