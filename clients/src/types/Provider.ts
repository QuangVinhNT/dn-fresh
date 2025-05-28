type Provider = {
  id: string;
  name: string;

  maNhaCungCap: string;
  tenNhaCungCap: string;
  moTa: string;
  ngayThanhLap: Date;
  ngayDangKy: Date | null;
  maDiaChi: string;
  trangThaiHoatDong: number;
  giayToPhapLy: string;
  ngayCapNhat: Date | null;
}

type AdminProviderName = Pick<Provider, 'id' | 'name'>

export enum ProviderStatus {
  'Ngưng hoạt động' = 0,
  'Đang hoạt động' = 1,
  'Tạm khóa' = 2,
}

type ProviderList = Pick<Provider, 'maNhaCungCap' | 'tenNhaCungCap' |  'ngayDangKy' | 'trangThaiHoatDong'>;

export type {
  AdminProviderName, ProviderList
}
