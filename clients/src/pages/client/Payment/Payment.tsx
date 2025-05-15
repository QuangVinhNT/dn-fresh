import { ButtonComponent, InputComponent, SelectComponent } from "@/components";
import './Payment.scss';
import ProductImg from '@/assets/images/sp1.png';
import SeparateNumber from "@/utils/separateNumber";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

const Payment = () => {
  return (
    <div className="payment-component">
      <div className="payment-content">
        <div className="receiving-info-payment">
          <div className="receiving-info">
            <h3>Thông tin nhận hàng</h3>
            <InputComponent
              name="email"
              placeholder="Email"
            />
            <InputComponent
              name="fullname"
              placeholder="Họ và tên"
            />
            <InputComponent
              name="phone-number"
              placeholder="Số điện thoại"
            />
            <InputComponent
              name="address"
              placeholder="Địa chỉ"
            />
            <SelectComponent
              name="city"
              items={[
                {
                  value: 'a',
                  content: 'Tỉnh/thành phố',
                  isSelected: true
                }
              ]}
            />
            <SelectComponent
              name="commune"
              items={[
                {
                  value: 'a',
                  content: 'Phường/xã',
                  isSelected: true
                }
              ]}
            />
            <InputComponent
              name="note"
              placeholder="Ghi chú"
              isTextarea
            />
          </div>
          <div className="payment">
            <h3>Thanh toán</h3>
            <div className="cod-payment">
              <input type="radio" name="payment" id="cod-payment" />
              <label htmlFor="cod-payment">Thanh toán khi giao hàng (COD)</label>
            </div>
            <div className="onl-payment">
              <input type="radio" name="payment" id="onl-payment" />
              <label htmlFor="onl-payment">Thanh toán trực tuyến</label>
            </div>
          </div>
        </div>
        <div className="order-info">
          <h3>Đơn hàng (1 sản phẩm)</h3>
          <div className="product-list">
            <div className="product-item">
              <div className="product-img">
                <img src={ProductImg} alt="" />
                <span>1</span>
              </div>
              <div className="product-name">
                <span className="name">Đào đỏ Mỹ</span>
                <span className="weight">500g</span>
              </div>
              <div className="product-price">
                <span>{`${SeparateNumber(138000)}₫`}</span>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src={ProductImg} alt="" />
                <span>1</span>
              </div>
              <div className="product-name">
                <span className="name">Đào đỏ Mỹ</span>
                <span className="weight">500g</span>
              </div>
              <div className="product-price">
                <span>{`${SeparateNumber(138000)}₫`}</span>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src={ProductImg} alt="" />
                <span>1</span>
              </div>
              <div className="product-name">
                <span className="name">Đào đỏ Mỹ</span>
                <span className="weight">500g</span>
              </div>
              <div className="product-price">
                <span>{`${SeparateNumber(138000)}₫`}</span>
              </div>
            </div>
          </div>
          <div className="fee-temp-delivery">
            <div className="fee-temp">
              <span>Tạm tính</span>
              <span>{`${SeparateNumber(138000)}₫`}</span>
            </div>
            <div className="fee-delivery">
              <span>Phí vận chuyển</span>
              <span>-</span>
            </div>
          </div>
          <div className="total-fee">
            <span>Tổng cộng</span>
            <span>{`${SeparateNumber(138000)}₫`}</span>
          </div>
          <div className="back-pay">
            <Link to={'/'} className="back">
              <IoChevronBackOutline />
              Quay về trang chủ
            </Link>
            <ButtonComponent
              label='Đặt hàng'
              type="submit"
              className="pay"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
