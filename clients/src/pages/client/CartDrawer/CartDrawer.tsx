import { cartStore } from "@/store/cartStore";
import './CartDrawer.scss';
import { IoAddOutline, IoCloseOutline, IoRemoveOutline } from "react-icons/io5";
import { overlayStore } from "@/store";
import { ButtonComponent } from "@/components";
import SeparateNumber from "@/utils/separateNumber";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const cartItem = {
  id: 'abc',
  img: 'http://localhost:5173/src/assets/images/sp1.png',
  name: 'Đào đỏ Mỹ',
  quantity: 100,
  price: 40000
};

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const CartDrawer = () => {
  const { isShowCart, hideCart, cartInfo } = cartStore();
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
          {Array.from({ length: 3 }).map((item, index) => (
            <div key={index} className="cart-item">
              <img src={cartItem.img} alt="" />
              <div className="detail-info">
                <b className="name">{cartItem.name}</b>
                <div className="quantity">
                  <span>Số lượng</span>
                  <div>
                    <IoRemoveOutline size={20} className="btn-minus" onClick={() => {
                      cartItem.quantity--;
                    }} />
                    <input type="text" value={cartItem.quantity} />
                    <IoAddOutline size={20} className="btn-plus" onClick={() => {
                      cartItem.quantity++;
                    }} />
                  </div>
                </div>
              </div>
              <div className="price-remove">
                <span className="price">{`${SeparateNumber(cartItem.price)} ₫`}</span>
                <span className="remove">Bỏ sản phẩm</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="total-price">
            <b>Tổng tiền: <span>{`${SeparateNumber(120000)} ₫`}</span></b>
          </div>
          <ButtonComponent label='Thanh toán' type="submit" variant="secondary" className="btn-pay" onClick={() =>
            navigate('/payment')} />
        </div>
      </form>
    </>
  );
};

export default CartDrawer;
