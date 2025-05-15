type Category = {
  id: string;
  name: string;
  status: number;
  createdAt: string;
  productQuantity: number;
}

export enum CategoryStatus {
  'Ngưng giao dịch' = 0,
  'Đang giao dịch' = 1
}

type CategorySelectBox = Pick<Category, 'id' | 'name'>

type CategoryList = Pick<Category, 'id' | 'name' | 'status' | 'createdAt' | 'productQuantity'>

export type {
  CategorySelectBox, CategoryList
}
