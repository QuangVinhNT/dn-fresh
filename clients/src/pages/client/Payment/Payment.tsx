import { getCities, getCommunes, getDetailById } from "@/api/addressApi";
import { insertOrder } from "@/api/orderApi";
import { ButtonComponent, InputComponent, SelectComponent } from "@/components";
import { loadingStore, overlayStore, userStore } from "@/store";
import { cartStore } from "@/store/cartStore";
import { SelectBox } from "@/types/ComponentType";
import { InsertOrderPayload } from "@/types/Order";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Payment.scss';
import { deleteCart } from "@/api/cartApi";
import { getUserById } from "@/api/userApi";
import { paymentVnPay } from "@/api/vnPayApi";
import { FormValues } from "@/types/Object";
import { toast } from "react-toastify";

const Payment = () => {
  const [cities, setCities] = useState<SelectBox[]>([]);
  const [communes, setCommunes] = useState<SelectBox[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const navigate = useNavigate();

  const { cart, clearCart, hideCart } = cartStore();
  const { showLoading, hideLoading } = loadingStore();
  const { hideOverlay } = overlayStore();
  const { user } = userStore();

  const { register, watch, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    fetchUser();
    fetchCities();
  }, []);

  useEffect(() => {
    const cityId = watch('city') + '';
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

  const fetchCommunes = async (cityId: string) => {
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

  const fetchUser = async () => {
    showLoading();
    try {
      const resUser = await getUserById(user?.id + '');
      const resAddress = await getDetailById(resUser.maDiaChi);
      setUserInfo({ ...resUser, ...resAddress });
      fetchCommunes(resAddress.maTinhThanhPho);
    } catch (error) {
      console.error('Error when load user:', error);
    } finally {
      hideLoading();
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    showLoading();
    try {
      const payload: InsertOrderPayload = {
        maKhachHang: user?.id + '',
        ghiChu: data['note'].toString(),
        phuongThucThanhToan: +data['payment'],
        chiTietDiaChi: data['address-detail'].toString(),
        maPhuongXa: data['commune'].toString(),
        chiTietDonHang: cart,
        giaTriDonHang: cart.reduce((prev, cur) => {
          const price = cur.tiLeKhuyenMai === 0 ? cur.donGia : cur.donGia - Math.round((cur.donGia * cur.tiLeKhuyenMai) / 100) * 100;
          return prev + price * cur.soLuong;
        }, 0)
      };
      if (payload.phuongThucThanhToan === 2) {
        const insertResult = await insertOrder(payload);
        console.log('Insert result:', insertResult);
        clearCart();
        const deleteResult = await deleteCart(user?.id + '');
        console.log('Delete result:', deleteResult);
        navigate('/');
      }
      if (payload.phuongThucThanhToan === 1) {
        // console.log(payload);
        const result = await paymentVnPay(payload);
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
          console.log(result.paymentUrl);
        }
      }
      toast.success('Đặt hàng thành công!');
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    } finally {
      hideLoading();
      hideCart();
      hideOverlay();
    }
  };

  return (
    <form className="payment-component" onSubmit={handleSubmit(onSubmit)}>
      <div className="payment-content">
        <div className="receiving-info-payment">
          {userInfo && (
            <div className="receiving-info">
              <h3>Thông tin nhận hàng</h3>
              <InputComponent
                title="Email"
                name="email"
                placeholder={userInfo.email}
                isReadOnly
                defaultValue
              />
              <InputComponent
                title="Họ tên"
                name="fullname"
                placeholder={userInfo.hoTen}
                isReadOnly
                defaultValue
              />
              <InputComponent
                title="Số điện thoại"
                name="phone-number"
                placeholder={userInfo.soDienThoai}
                isReadOnly
                defaultValue
              />
              <SelectComponent
                title="Tỉnh/thành phố"
                name="city"
                items={cities}
                register={register}
                placeholder={userInfo.maTinhThanhPho}
                defaultValue
                isRequired
              />
              <SelectComponent
                title="Phường/xã"
                name="commune"
                items={communes}
                register={register}
                placeholder={userInfo.maPhuongXa}
                defaultValue
                isRequired
              />
              <InputComponent
                title="Địa chỉ"
                name="address-detail"
                placeholder={userInfo.chiTietDiaChi}
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
          )}
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
