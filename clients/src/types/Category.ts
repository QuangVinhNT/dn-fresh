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
}

export enum CategoryStatus {
  'Ngưng giao dịch' = 0,
  'Đang giao dịch' = 1
}

type CategorySelectBox = Pick<Category, 'id' | 'name'>

type CategoryFilter = Pick<Category, 'maDanhMuc' | 'tenDanhMuc'>

type CategoryList = Pick<Category, 'id' | 'name' | 'status' | 'createdAt' | 'productQuantity'>

export type {
  CategorySelectBox, CategoryList, CategoryFilter
}
