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
}

export enum ProductStatus {
  'Ngưng giao dịch' = 0,
  'Đang giao dịch' = 1,
  'Tạm hết hàng' = 2
}

type AdminProductList = Pick<Product, 'id' | 'name' | 'imageUrls' | 'category' | 'quantity' | 'unit' | 'createdAt' | 'status'>

type ProductList = Pick<Product, 'id' | 'name' | 'imageUrls' | 'price' | 'discountRate'>

type AdminProductDetail = Pick<Product, 'id' | 'name' | 'imageUrls' | 'price' | 'quantity' | 'unit' | 'category' | 'createdAt' | 'updatedAt' | 'description' | 'categoryId' | 'status' | 'discountRate'>

type ProductDetail = Pick<Product, 'id' | 'name' | 'price' | 'quantity' | 'unit' | 'description' | 'imageUrls' | 'status' | 'discountRate'>

type InsertProductPayload = Pick<Product, 'name' | 'price' | 'unit' | 'description' | 'categoryId' | 'imageUrls'>

type UpdateProductPayload = Pick<Product, 'name' | 'price' | 'unit' | 'categoryId' | 'status' | 'discountRate' | 'description' | 'imageUrls'>

export type {
  AdminProductList, AdminProductDetail, InsertProductPayload, UpdateProductPayload, ProductList, ProductDetail
}
