type Cart = {
  maThucPham: string;
  maNguoiDung: string;
  soLuong: number;
  ngayTao: Date | null;
};

type InsertCartPayload = Pick<Cart, 'maThucPham' | 'soLuong'>;
type UpdateCartPayload = Pick<Cart, 'maThucPham' | 'soLuong'>;

export type {
  InsertCartPayload, UpdateCartPayload
};
