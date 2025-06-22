import { IoDocumentTextOutline, IoHomeOutline, IoPeopleOutline, IoPersonOutline, IoRestaurantOutline, IoStorefrontOutline } from "react-icons/io5";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { AdminHeader, AdminSidebar, LoadingComponent, Overlay } from "../../components";
import { loadingStore, overlayStore, userStore } from "../../store";
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
  {
    name: 'Nhà cung cấp',
    link: '/admin/food-provider',
    affix: <IoStorefrontOutline size={22} />,
    childrens: [],
  }
];

const Admin = () => {
  const { isShowOverlay } = overlayStore();
  const { isShowLoading } = loadingStore();
  const {user} = userStore();
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
      {isShowLoading && <LoadingComponent />}
      <AdminSidebar menuItems={menuItems} />
      <div style={{ backgroundColor: '#f0f1f1', flex: 1, overflowX: 'hidden' }}>
        <AdminHeader category={getCategory()} user={{hoTen: user?.fullname + '', hinhAnh: user?.image + ''}} />
        <div style={{ margin: '20px' }}>
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Admin;
