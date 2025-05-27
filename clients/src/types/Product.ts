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
}

export enum ProductStatus {
  'Ngưng giao dịch' = 0,
  'Đang giao dịch' = 1,
  'Tạm hết hàng' = 2
}

type AdminProductList = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'category' | 'tenDanhMuc' | 'donViTinh' | 'ngayTao' | 'trangThai' | 'soLuongTonKho'>

type ProductList = Pick<Product, 'maThucPham' | 'tenThucPham' | 'hinhAnh' | 'donGia' | 'tiLeKhuyenMai' | 'trangThai'>

type AdminProductDetail = Pick<Product, 'id' | 'name' | 'imageUrls' | 'price' | 'quantity' | 'unit' | 'category' | 'createdAt' | 'updatedAt' | 'description' | 'categoryId' | 'status' | 'discountRate'>

type ProductDetail = Pick<Product, 'maThucPham' | 'tenThucPham' | 'donGia' | 'soLuongTonKho' | 'donViTinh' | 'moTa' | 'hinhAnh' | 'trangThai' | 'tiLeKhuyenMai'>

type InsertProductPayload = Pick<Product, 'name' | 'price' | 'unit' | 'description' | 'categoryId' | 'imageUrls'>

type UpdateProductPayload = Pick<Product, 'name' | 'price' | 'unit' | 'categoryId' | 'status' | 'discountRate' | 'description' | 'imageUrls'>

export type {
  AdminProductList, AdminProductDetail, InsertProductPayload, UpdateProductPayload, ProductList, ProductDetail
}
