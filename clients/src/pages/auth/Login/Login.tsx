import { getCart } from "@/api/cartApi";
import { getFavouriteProducts } from "@/api/favouriteProductApi";
import { getRoleToken, login } from "@/api/userApi";
import AdminIcon from '@/assets/images/admin-icon.png';
import CustomerIcon from '@/assets/images/customer-icon.png';
import DeliveryStaffIcon from '@/assets/images/delivery-icon.png';
import InventoryStaffIcon from '@/assets/images/inventory-icon.png';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import { ButtonComponent, ErrorMessage, InputComponent, Overlay } from "@/components";
import { cartStore, favouriteFoodsStore, overlayStore, userStore } from "@/store";
import { FormValues } from "@/types/Object";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Login.scss';

const roles = [
  {
    image: CustomerIcon,
    label: 'Khách hàng',
    link: '/',
    value: 'VT004'
  },
  {
    image: AdminIcon,
    label: 'Quản trị viên',
    link: '/admin',
    value: 'VT001'
  },
  {
    image: InventoryStaffIcon,
    label: 'Nhân viên kho',
    link: '/inventory-staff',
    value: 'VT002'
  },
  {
    image: DeliveryStaffIcon,
    label: 'Nhân viên giao hàng',
    link: '/delivery-staff',
    value: 'VT003'
  },
];

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowRoles, setIsShowRoles] = useState(false);
  const [userRoles, setUserRoles] = useState<{ image: string, label: string, link: string, value: string; }[]>([]);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormValues>();
  const { showOverlay, hideOverlay, isShowOverlay } = overlayStore();
  const { setUser, user, setRoleUser } = userStore();
  const { setCart } = cartStore();
  const { setFavouriteFoods } = favouriteFoodsStore();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      email: data['email'].toString().trim(),
      password: data['password'].toString().trim()
    };
    if (payload.email.length === 0 || payload.password.length === 0) {
      setErrorMessage('Vui lòng điền email/mật khẩu!');
      return;
    }
    try {
      const loginResult = await login(payload);
      const rolesResult = loginResult.danhSachVaiTro as string[];
      setUser({ id: loginResult.maNguoiDung, fullname: loginResult.hoTen, image: loginResult.hinhAnh });

      if (rolesResult.length === 1) {
        setErrorMessage('');
        const link = roles.find(role => role.value === rolesResult[0])?.link + '';
        const token = await getRoleToken({ userId: loginResult.maNguoiDung, roleId: rolesResult[0] });
        localStorage.setItem('access_token', token);
        setRoleUser(rolesResult[0]);
        navigate(link);
      } else {
        setUserRoles(roles.filter(role => rolesResult.includes(role.value)));
        setErrorMessage('');
        setIsShowRoles(true);
        showOverlay();
      }

      const cartItems = await getCart(loginResult.maNguoiDung + '');
      setCart(cartItems);
      const favouriteFoods = await getFavouriteProducts(1, 5, loginResult.maNguoiDung + '');
      setFavouriteFoods(favouriteFoods.data);

    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setErrorMessage((error as any).data.message);
    }
  };

  return (
    <>
      <div className="login-component">
        <h1>Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            name="email"
            title="Email"
            placeholder="Nhập email của bạn"
            type="email"
            register={register}
            onChange={() => {
              setErrorMessage('');
            }}
          />
          <InputComponent
            name="password"
            title="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            register={register}
            onChange={() => {
              setErrorMessage('');
            }}
          />
          <div className="remember-forgot">
            {/* <CheckboxComponent
              id="remember"
              labels={[{ name: 'Ghi nhớ đăng nhập', id: 'remember' }]}
            /> */}
            <div className="forgot" style={{ marginLeft: 'auto' }}>
              <Link to={'/forgot-password'}>Quên mật khẩu?</Link>
            </div>
          </div>
          {errorMessage.length > 0 && !isShowRoles && <ErrorMessage message={errorMessage} />}
          <ButtonComponent
            label='Đăng nhập'
            type="submit"
            variant="secondary"
            className="btn-login"
          />
          <p>Bạn không có tài khoản? <Link to={'/register'}>Đăng ký ngay</Link></p>
          <span className="other-login-text">hoặc</span>
          <ButtonComponent
            label='Đăng nhập bằng Google'
            type="no-submit"
            affix={<img src={GoogleIcon} width={25} height={25} />}
            className="btn-login-with-google"
          />
        </form>
        <div className="user-role-component" style={{ transform: isShowRoles ? 'translateY(0%)' : 'translateY(-200%)' }}>
          <div className="close-btn">
            <IoClose size={28} className="close-icon" onClick={() => {
              setIsShowRoles(false);
              hideOverlay();
            }} />
          </div>
          <h1>Đăng nhập</h1>
          <p>Chọn loại tài khoản bạn muốn sử dụng đăng nhập</p>
          <div className="role-list">
            {userRoles.length > 1 && userRoles.map((item, idx) => (
              <div className="role-item" key={idx}
                onClick={async () => {
                  const token = await getRoleToken({ userId: user?.id + '', roleId: item.value });
                  localStorage.setItem('access_token', token);
                  navigate(item.link);
                  setRoleUser(item.value);
                  hideOverlay();
                }}
              >
                <img src={item.image} alt="" />
                <span>Tài khoản {item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isShowOverlay && <Overlay />}
    </>
  );
};

export default Login;
