import { getFavouriteProducts } from "@/api/favouriteProductApi";
import DecoHeader from '@/assets/images/deco-header.png';
import Logo from '@/assets/svgs/dnfresh-logo-white.svg';
import { favouriteFoodsStore, overlayStore, userStore } from "@/store";
import { cartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './ClientHeader.scss';

const menuItems = [
  {
    name: 'Trang chủ',
    link: '/',
  },
  {
    name: 'Giới thiệu',
    link: '/introduce',
  },
  {
    name: 'Thực phẩm',
    link: '/foods',
  },
  {
    name: 'Đơn hàng',
    link: '/orders',
  },
  {
    name: 'Liên hệ',
    link: '/contact',
  },
];

const ClientHeader = () => {
  const [total, setTotal] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  const { showCart, cart } = cartStore();
  const { favouriteFoods } = favouriteFoodsStore();
  const { showOverlay } = overlayStore();
  const { user } = userStore();

  useEffect(() => {
    fetchFavouriteProducts();
  }, []);

  const fetchFavouriteProducts = async () => {
    try {
      const response = await getFavouriteProducts(1, 5, user?.id + '');
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    }
  };

  return (
    <div className="client-header-component">
      <div className="client-header-content">
        <div className="client-header-menus">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index} style={{ color: location.pathname === item.link ? '#ffb416' : '#fff' }}>{item.name}</Link>
          ))}
        </div>
        <div className="client-header-logo">
          <img src={Logo} alt="" />
          <span>Fresh - Fast - Reliable</span>
        </div>
        <div className="client-header-tools">
          <div className="favourite tool" onClick={() => navigate('/favourites')}>
            <span className="quantity">{favouriteFoods.length}</span>
            <IoHeartOutline size={24} className="icon" />
          </div>
          <div className="cart tool" onClick={() => {
            showCart();
            showOverlay();
          }}>
            <span className="quantity">{cart.length}</span>
            <IoCartOutline size={24} className="icon" />
          </div>
          <div className="user">
            {user ? (
              <div>
                <span>Xin chào, <Link to={'/personal-info'} className="username">{user.fullname}</Link>!</span>
              </div>
            ) : (
              <div>
                <Link to={'/login'} className="sign-in-btn">Đăng nhập</Link>
                <span> | </span>
                <Link to={'/register'} className="sign-up-btn">Đăng ký</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <img src={DecoHeader} alt="" className="deco-header" />
    </div>
  );
};

export default ClientHeader;
