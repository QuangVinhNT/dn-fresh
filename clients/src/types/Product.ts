type Product = {
  id: string;
  name: string;
  imageUrls: string[];
  price: number;
  description: string;
  status: number;
  category: string;
  discountRate: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  unit: string;
  packageCode: string;
  mfgDate: string;
  expDate: string;
  inboundPrice: number;
  inboundQuantity: number;
  categoryId: string;

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

type AdminProductList = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'category' | 'tenDanhMuc' | 'donViTinh' | 'ngayTao' | 'trangThai' | 'soLuongTonKho'>

type ProductList = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'donGia' | 'tiLeKhuyenMai' | 'trangThai'>

type AdminProductDetail = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'donGia' | 'soLuongTonKho' | 'donViTinh' | 'tenDanhMuc' | 'ngayTao' | 'ngayCapNhat' | 'moTa' | 'maDanhMuc' | 'trangThai' | 'tiLeKhuyenMai'>

type ProductPackage = Pick<Product, 'maLoHang' | 'soLuongTonKho' | 'donViTinh' | 'hanSuDung' | 'nhaCungCap'>

type ProductDetail = Pick<Product, 'maThucPham' | 'tenThucPham' | 'donGia' | 'soLuongTonKho' | 'donViTinh' | 'moTa' | 'hinhAnh' | 'trangThai' | 'tiLeKhuyenMai'>

type InsertProductPayload = Pick<Product, 'tenThucPham' | 'donGia' | 'donViTinh' | 'moTa' | 'maDanhMuc' | 'hinhAnh'>

type UpdateProductPayload = Pick<Product, 'tenThucPham' | 'donGia' | 'donViTinh' | 'maDanhMuc' | 'trangThai' | 'tiLeKhuyenMai' | 'moTa' | 'hinhAnh'>

export type {
  AdminProductList, AdminProductDetail, InsertProductPayload, UpdateProductPayload, ProductList, ProductDetail, ProductPackage
}
