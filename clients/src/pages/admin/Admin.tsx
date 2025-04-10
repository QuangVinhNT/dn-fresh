import { IoDocumentTextOutline, IoHomeOutline, IoPeopleOutline, IoPersonOutline, IoRestaurantOutline } from "react-icons/io5";
import { Outlet, useLocation } from "react-router-dom";
import { AdminHeader, AdminSidebar, Overlay } from "../../components";
import { User } from "../../types";
import { overlayStore } from "../../store";

const user: User = {
  fullname: 'Admin',
  avatar: 'https://i.pinimg.com/736x/5b/cf/1b/5bcf1b2636aae39616d08ee72d1b9569.jpg'
};

const menuItems = [
  {
    name: 'Tổng quan',
    link: '/admin',
    affix: <IoHomeOutline size={22} />,
    childrens: [],
  },
  {
    name: 'Đơn hàng',
    link: '/admin/order',
    affix: <IoDocumentTextOutline size={22} />,
    childrens: [],
  },
  {
    name: 'Thực phẩm',
    link: undefined,
    affix: <IoRestaurantOutline size={22} />,
    childrens: [
      {
        name: 'Danh sách thực phẩm',
        link: '/admin/food-list'
      },
      {
        name: 'Loại thực phẩm',
        link: '/admin/food-category'
      },
      {
        name: 'Nhập hàng',
        link: '/admin/import-food'
      },
      {
        name: 'Xuất hàng',
        link: '/admin/export-food'
      }
    ],
  },
  {
    name: 'Khách hàng',
    link: '/admin/customer',
    affix: <IoPeopleOutline size={22} />,
    childrens: [],
  },
  {
    name: 'Nhân sự',
    link: '/admin/staff',
    affix: <IoPersonOutline size={22} />,
    childrens: [],
  },
];

const Admin = () => {
  const { isShowOverlay } = overlayStore();
  const location = useLocation();
  const getCategory = () => {
    let result = '';
    menuItems.forEach((item) => {
      if (item.link && item.link === location.pathname) {
        result = item.name;
      } else {
        item.childrens.forEach((children) => {
          if (children.link === location.pathname) {
            result = children.name;
          }
        });
      }
    });
    return result;
  };
  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }} id="admin-root">
      {isShowOverlay && <Overlay />}
      <AdminSidebar menuItems={menuItems} />
      <div style={{ backgroundColor: '#f0f1f1', flex: 1, overflowX: 'hidden' }}>
        <AdminHeader category={getCategory()} user={user} />
        <div style={{ margin: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
