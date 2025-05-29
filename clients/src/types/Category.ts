type Category = {
  maDanhMuc: string;
  tenDanhMuc: string;
  moTa: string;
  trangThai: number;
  ngayTao: Date;
  ngayCapNhat: Date;
  soLuongThucPham: number;
};

export enum CategoryStatus {
  'Ngưng giao dịch' = 0,
  'Đang giao dịch' = 1
}

type CategorySelectBox = Pick<Category, 'maDanhMuc' | 'tenDanhMuc'>;

type CategoryFilter = Pick<Category, 'maDanhMuc' | 'tenDanhMuc'>;

type CategoryList = Pick<Category, 'maDanhMuc' | 'tenDanhMuc' | 'trangThai' | 'ngayTao' | 'soLuongThucPham'>;

type CategoryDetail = Pick<Category, 'maDanhMuc' | 'tenDanhMuc' | 'moTa' | 'trangThai' | 'ngayTao' | 'ngayCapNhat'>

type InsertCategoryPayload = Pick<Category, 'tenDanhMuc' | 'moTa' | 'trangThai'>

export type {
  CategorySelectBox, CategoryList, CategoryFilter, CategoryDetail, InsertCategoryPayload
};
