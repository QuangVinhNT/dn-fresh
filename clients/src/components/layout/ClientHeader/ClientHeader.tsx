import Logo from '@/assets/svgs/dnfresh-logo-white.svg';
import DecoHeader from '@/assets/images/deco-header.png'
import { useState } from "react";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const location = useLocation();

  return (
    <div className="client-header-component">
      <div className="client-header-content">
        <div className="client-header-menus">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index} style={{color: location.pathname === item.link ? '#ffb416' : '#fff'}}>{item.name}</Link>
          ))}
        </div>
        <div className="client-header-logo">
          <img src={Logo} alt="" />
          <span>Fresh - Fast - Reliable</span>
        </div>
        <div className="client-header-tools">
          <div className="favourite tool">
            <span className="quantity">0</span>
            <IoHeartOutline size={24} className="icon"/>
          </div>
          <div className="cart tool">
            <span className="quantity">0</span>
            <IoCartOutline size={24} className="icon"/>
          </div>
          <div className="user">
            {isSignedIn ? (
              <div>
                <span>Xin chào, <Link to={'/'} className="username">Quang Vinh</Link>!</span>
              </div>
            ): (
              <div>
                <Link to={'/'} className="sign-in-btn">Đăng nhập</Link>
                <span> | </span>
                <Link to={'/'} className="sign-up-btn">Đăng ký</Link>
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
