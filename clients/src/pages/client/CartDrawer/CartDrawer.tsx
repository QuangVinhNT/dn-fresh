import { deleteCart } from "@/api/cartApi";
import { ButtonComponent } from "@/components";
import { overlayStore, userStore } from "@/store";
import { cartStore } from "@/store/cartStore";
import SeparateNumber from "@/utils/separateNumber";
import { useState } from "react";
import { IoAddOutline, IoCloseOutline, IoRemoveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './CartDrawer.scss';
import { getProductById } from "@/api/productApi";
import { toast } from "react-toastify";

const CartDrawer = () => {
  const [productsError, setProductsError] = useState<{ maThucPham: string, soLuong: number; }[]>([]);
  const { isShowCart, hideCart, cart, increaseQuantity, decreaseQuantity, removeFromCart } = cartStore();
  const { hideOverlay } = overlayStore();
  const { user } = userStore();
  const navigate = useNavigate();

  const handlePay = async () => {
    const cartProducts = cart.map(item => ({ maThucPham: item.maThucPham, soLuongMua: item.soLuong }));
    const inventoryProducts = await Promise.all(cartProducts.map(async (product) => {
      const inventoryProduct = await getProductById(product.maThucPham);
      return {
        maThucPham: inventoryProduct.maThucPham,
        soLuongThucTe: +inventoryProduct.soLuongTonKho - +inventoryProduct.soLuongChoXuat
      };
    }));
    const checkingProducts = cartProducts.map(product => ({
      maThucPham: product.maThucPham,
      soLuongConLai: inventoryProducts.find(iProduct => iProduct.maThucPham === product.maThucPham)?.soLuongThucTe as number - product.soLuongMua
    }));
    const statusProducts = checkingProducts.map(product => ({
      maThucPham: product.maThucPham,
      trangThai: product.soLuongConLai >= 0,
      soLuong: product.soLuongConLai < 0 ? inventoryProducts.find(iProduct => iProduct.maThucPham === product.maThucPham)?.soLuongThucTe as number : cartProducts.find(cProduct => cProduct.maThucPham === product.maThucPham)?.soLuongMua as number
    }));
    let signal = 0;
    statusProducts.map(product => {
      if (!product.trangThai) {
        setProductsError(prev => ([
          ...prev,
          {
            maThucPham: product.maThucPham + '',
            soLuong: +product.soLuong
          }
        ]));
        signal = 1;
      }
    });
    if (signal === 0) {
      navigate('/payment');
    }
  };

  return (
    <>
      <div
        className="cart-drawer-component"
        style={{
          transform: isShowCart ? 'translateX(0%)' : 'translateX(100%)'
        }}
      >
        <div className="close-btn">
          <IoCloseOutline size={32} className="close-icon" onClick={() => {
            hideCart();
            hideOverlay();
          }} />
        </div>
        <div className="cart-list">
          {cart.map((item, index) => {
            const price = item.tiLeKhuyenMai === 0 ? SeparateNumber(item.donGia) : SeparateNumber(item.donGia - Math.round((item.donGia * item.tiLeKhuyenMai) / 100) * 100);
            return (
              <div key={index} className="cart-item">
                <img src={item.hinhAnh[0]} alt="" />
                <div className="detail-info">
                  <b className="name">{item.tenThucPham}</b>
                  <div className="quantity">
                    <span>Số lượng{productsError.length > 0 ? productsError.find(product => product.maThucPham === item.maThucPham)?.soLuong + '' !== 'undefined' && <span style={{ color: 'red' }}> (tối đa: {productsError.find(product => product.maThucPham === item.maThucPham)?.soLuong})</span> : ''}</span>
                    <div>
                      <IoRemoveOutline size={20} className="btn-minus" onClick={() => {
                        decreaseQuantity(item.maThucPham);
                      }} />
                      <input type="text" value={item.soLuong} />
                      <IoAddOutline size={20} className="btn-plus" onClick={() => {
                        increaseQuantity(item.maThucPham);
                      }} />
                    </div>
                  </div>
                </div>
                <div className="price-remove">
                  <span className="price">{`${price} ₫`}</span>
                  <span className="remove" onClick={async () => {
                    try {
                      const deleteResult = await deleteCart(user?.id + '', item.maThucPham);
                      removeFromCart(item.maThucPham);
                      toast.success(`Xóa ${item.tenThucPham} khỏi giỏ hàng thành công!`)
                    } catch (error) {
                      toast.error(`Lỗi: ${error}`);
                    }
                  }}>Bỏ sản phẩm</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-footer">
          <div className="total-price">
            <b>Tổng tiền: <span>{`${SeparateNumber(cart.reduce((prev, cur) => {
              const price = cur.tiLeKhuyenMai === 0 ? cur.donGia : cur.donGia - Math.round((cur.donGia * cur.tiLeKhuyenMai) / 100) * 100;
              return prev + price * cur.soLuong;
            }, 0))} ₫`}</span></b>
          </div>
          <ButtonComponent label='Thanh toán' type="submit" variant="secondary" className="btn-pay" onClick={handlePay} />
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
