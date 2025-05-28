type Category = {
  id: string;
  name: string;
  status: number;
  createdAt: string;
  productQuantity: number;

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

export type {
  CategorySelectBox, CategoryList, CategoryFilter
};
