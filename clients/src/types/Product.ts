type Product = {
  maThucPham: string;
  tenThucPham: string;
  donGia: number;
  moTa: string;
  trangThai: number;
  maDanhMuc: string;
  tenDanhMuc: string;
  tiLeKhuyenMai: number;
  ngayTao: Date;
  ngayCapNhat: Date;
  soLuongTonKho: number;
  donViTinh: string;
  hinhAnh: string[];
  nhaCungCap: string;
  maLoHang: string;
  hanSuDung: Date;
}

export enum ProductStatus {
  'Ngưng giao dịch' = 0,
  'Đang giao dịch' = 1,
  'Tạm hết hàng' = 2
}

type AdminProductList = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'tenDanhMuc' | 'donViTinh' | 'ngayTao' | 'trangThai' | 'soLuongTonKho'>

type ProductList = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'donGia' | 'tiLeKhuyenMai' | 'trangThai'>

type AdminProductDetail = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'donGia' | 'soLuongTonKho' | 'donViTinh' | 'tenDanhMuc' | 'ngayTao' | 'ngayCapNhat' | 'moTa' | 'maDanhMuc' | 'trangThai' | 'tiLeKhuyenMai'>

type ProductPackage = Pick<Product, 'maLoHang' | 'soLuongTonKho' | 'donViTinh' | 'hanSuDung' | 'nhaCungCap'>

type ProductDetail = Pick<Product, 'maThucPham' | 'tenThucPham' | 'donGia' | 'soLuongTonKho' | 'donViTinh' | 'moTa' | 'hinhAnh' | 'trangThai' | 'tiLeKhuyenMai'>

type InsertProductPayload = Pick<Product, 'tenThucPham' | 'donGia' | 'donViTinh' | 'moTa' | 'maDanhMuc' | 'hinhAnh'>

type UpdateProductPayload = Pick<Product, 'tenThucPham' | 'donGia' | 'donViTinh' | 'maDanhMuc' | 'trangThai' | 'tiLeKhuyenMai' | 'moTa' | 'hinhAnh'>

export type {
  AdminProductList, AdminProductDetail, InsertProductPayload, UpdateProductPayload, ProductList, ProductDetail, ProductPackage
}
