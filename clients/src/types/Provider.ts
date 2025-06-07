
type Provider = {
  maNhaCungCap: string;
  tenNhaCungCap: string;
  moTa: string;
  ngayThanhLap: Date;
  ngayDangKy: Date | null;
  maDiaChi: string;
  trangThaiHoatDong: number;
  giayToPhapLy: string;
  ngayCapNhat: Date | null;
};

type AdminProviderName = Pick<Provider, 'maNhaCungCap' | 'tenNhaCungCap'>;

export enum ProviderStatus {
  'Ngưng hoạt động' = 0,
  'Đang hoạt động' = 1,
  'Tạm khóa' = 2,
}

type ProviderList = Pick<Provider, 'maNhaCungCap' | 'tenNhaCungCap' | 'ngayDangKy' | 'trangThaiHoatDong'>;

type InsertProviderPayload = Pick<Provider, 'tenNhaCungCap' | 'moTa' | 'ngayThanhLap' | 'trangThaiHoatDong' | 'giayToPhapLy'> & {
  chiTietDiaChi: string,
  maPhuongXa: string;
};

type UpdateProviderPayload = Pick<Provider, 'tenNhaCungCap' | 'moTa' | 'ngayThanhLap' | 'trangThaiHoatDong' | 'giayToPhapLy'> & {
  chiTietDiaChi: string,
  maPhuongXa: string;
};

type ProviderDetailType = Pick<Provider, 'maNhaCungCap' | 'tenNhaCungCap' | 'moTa' | 'ngayCapNhat' | 'ngayDangKy' | 'trangThaiHoatDong' | 'giayToPhapLy' | 'ngayThanhLap'> & {
  diaChi: string,
  chiTietDiaChi: string,
  maPhuongXa: string,
  maTinhThanhPho: string,
  danhMucCungCap: string,
  thucPhamCungCap: {
    maThucPham: string,
    tenThucPham: string,
    soLuong: number;
  }[];
};

export type {
  AdminProviderName, InsertProviderPayload, ProviderDetailType, ProviderList, UpdateProviderPayload
};

