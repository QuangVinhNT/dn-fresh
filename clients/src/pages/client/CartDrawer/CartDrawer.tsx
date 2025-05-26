import { cartStore } from "@/store/cartStore";
import './CartDrawer.scss';
import { IoAddOutline, IoCloseOutline, IoRemoveOutline } from "react-icons/io5";
import { overlayStore } from "@/store";
import { ButtonComponent } from "@/components";
import SeparateNumber from "@/utils/separateNumber";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const CartDrawer = () => {
  const { isShowCart, hideCart, cart, increaseQuantity, decreaseQuantity, removeFromCart } = cartStore();
  const { hideOverlay } = overlayStore();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form
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
        <div className="cart-list" onSubmit={handleSubmit(onSubmit)}>
          {cart.map((item, index) => {
            const price = item.tiLeKhuyenMai === 0 ? SeparateNumber(item.donGia) : SeparateNumber(item.donGia - Math.round((item.donGia * item.tiLeKhuyenMai) / 100) * 100)
            return (
              <div key={index} className="cart-item">
                <img src={item.hinhAnh[0]} alt="" />
                <div className="detail-info">
                  <b className="name">{item.tenThucPham}</b>
                  <div className="quantity">
                    <span>Số lượng</span>
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
                  <span className="remove" onClick={() => {
                    removeFromCart(item.maThucPham);
                  }}>Bỏ sản phẩm</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-footer">
          <div className="total-price">
            <b>Tổng tiền: <span>{`${SeparateNumber(cart.reduce((prev, cur) => {
              const price = cur.tiLeKhuyenMai === 0 ? cur.donGia : cur.donGia - Math.round((cur.donGia * cur.tiLeKhuyenMai) / 100) * 100
              return prev + price * cur.soLuong
            }, 0))} ₫`}</span></b>
          </div>
          <ButtonComponent label='Thanh toán' type="submit" variant="secondary" className="btn-pay" onClick={() =>
            navigate('/payment')} />
        </div>
      </form>
    </>
  );
};

export default CartDrawer;
