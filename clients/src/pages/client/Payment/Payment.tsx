import { getCities, getCommunes } from "@/api/addressApi";
import { insertOrder } from "@/api/orderApi";
import { ButtonComponent, InputComponent, SelectComponent } from "@/components";
import { loadingStore } from "@/store";
import { cartStore } from "@/store/cartStore";
import { SelectBox } from "@/types/ComponentType";
import { InsertOrderPayload } from "@/types/Order";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Payment.scss';

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const Payment = () => {
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);
  const navigate = useNavigate();

  const { cart } = cartStore();
  const { showLoading, hideLoading } = loadingStore();

  const { register, watch, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    fetchCities();
    fetchCommunes();
  }, []);

  useEffect(() => {
    const cityId = typeof watch('city') === 'undefined' ? 'DN' : watch('city') as string;
    fetchCommunes(cityId);
  }, [watch('city')]);

  const fetchCities = async () => {
    showLoading();
    try {
      const response = await getCities();
      const data = response.map((item, idx) => ({
        value: item.maTinhThanhPho,
        content: item.tenTinhThanhPho,
        isSelected: idx === 0
      }));
      setCities(data);
    } catch (error) {
      console.error('Error when load cities:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchCommunes = async (cityId: string = 'DN') => {
    showLoading();
    try {
      const response = await getCommunes(cityId);
      const data = response.map((item, idx) => ({
        value: item.maPhuongXa,
        content: item.tenPhuongXa,
        isSelected: idx === 0
      }));
      setCommunes(data);
    } catch (error) {
      console.error('Error when load cities:', error);
    } finally {
      hideLoading();
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: InsertOrderPayload = {
      maKhachHang: 'ND003',
      ghiChu: data['note'].toString(),
      phuongThucThanhToan: +data['payment'],
      chiTietDiaChi: data['address-detail'].toString(),
      maPhuongXa: data['commune'].toString(),
      chiTietDonHang: cart
    };
    const insertResult = await insertOrder(payload);
    console.log('Insert result:', insertResult)
    navigate('/')
  };

  return (
    <form className="payment-component" onSubmit={handleSubmit(onSubmit)}>
      <div className="payment-content">
        <div className="receiving-info-payment">
          <div className="receiving-info">
            <h3>Thông tin nhận hàng</h3>
            <InputComponent
              title="Email"
              name="email"
              placeholder="abc@gmail.com"
              isReadOnly
              defaultValue
            />
            <InputComponent
              title="Họ tên"
              name="fullname"
              placeholder="Nguyễn Văn A"
              isReadOnly
              defaultValue
            />
            <InputComponent
              title="Số điện thoại"
              name="phone-number"
              placeholder="0901987765"
              isReadOnly
              defaultValue
            />
            <SelectComponent
              title="Tỉnh/thành phố"
              name="city"
              items={cities}
              register={register}
              defaultValue
              isRequired
            />
            <SelectComponent
              title="Phường/xã"
              name="commune"
              items={communes}
              register={register}
              defaultValue
              isRequired
            />
            <InputComponent
              title="Địa chỉ"
              name="address-detail"
              placeholder="Thôn Mỹ Sơn"
              register={register}
              defaultValue
              isRequired
            />
            <InputComponent
              title="Ghi chú"
              name="note"
              placeholder="Ghi chú"
              isTextarea
              isRequired={false}
              register={register}
            />
          </div>
          <div className="payment">
            <h3>Thanh toán</h3>
            <div className="cod-payment">
              <input type="radio" id="cod-payment" {...register('payment')} value={2} defaultChecked />
              <label htmlFor="cod-payment">Thanh toán khi giao hàng (COD)</label>
            </div>
            <div className="onl-payment">
              <input type="radio" id="onl-payment" {...register('payment')} value={1} />
              <label htmlFor="onl-payment">Thanh toán trực tuyến</label>
            </div>
          </div>
        </div>
        <div className="order-info">
          <h3>Đơn hàng (1 sản phẩm)</h3>
          <div className="product-list">
            {cart.map((item, idx) => (
              <div className="product-item" key={idx}>
                <div className="product-img">
                  <img src={item.hinhAnh[0]} alt="" />
                  <span>{item.soLuong}</span>
                </div>
                <div className="product-name">
                  <span className="name">{item.tenThucPham}</span>
                  <span className="weight">1 {item.donViTinh}</span>
                </div>
                <div className="product-price">
                  <span>{`${SeparateNumber(item.donGia)}₫`}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="fee-temp-delivery">
            <div className="fee-temp">
              <span>Tạm tính</span>
              <span>{`${SeparateNumber(cart.reduce((prev, cur) => {
                const price = cur.tiLeKhuyenMai === 0 ? cur.donGia : cur.donGia - Math.round((cur.donGia * cur.tiLeKhuyenMai) / 100) * 100;
                return prev + price * cur.soLuong;
              }, 0))} ₫`}</span>
            </div>
            <div className="fee-delivery">
              <span>Phí vận chuyển</span>
              <span>-</span>
            </div>
          </div>
          <div className="total-fee">
            <span>Tổng cộng</span>
            <span>{`${SeparateNumber(cart.reduce((prev, cur) => {
              const price = cur.tiLeKhuyenMai === 0 ? cur.donGia : cur.donGia - Math.round((cur.donGia * cur.tiLeKhuyenMai) / 100) * 100;
              return prev + price * cur.soLuong;
            }, 0))} ₫`}</span>
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
    </form>
  );
};

export default Payment;
