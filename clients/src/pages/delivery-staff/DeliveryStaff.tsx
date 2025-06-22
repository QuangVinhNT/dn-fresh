import { AdminHeader, AdminSidebar, LoadingComponent, Overlay } from "@/components";
import { loadingStore, overlayStore, userStore } from "@/store";
import { ReactNode } from "react";
import { IoDocumentTextOutline, IoHomeOutline } from "react-icons/io5";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
interface ChildrenType {
  name: string;
  link: string;
}

interface MenuItem {
  name: string;
  link: string | undefined;
  affix: ReactNode;
  childrens: ChildrenType[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Tổng quan',
    link: '/delivery-staff',
    affix: <IoHomeOutline size={22} />,
    childrens: [],
  },
  {
    name: 'Đơn hàng',
    link: '/delivery-staff/orders',
    affix: <IoDocumentTextOutline size={22} />,
    childrens: [],
  }
];
const DeliveryStaff = () => {
  const { isShowOverlay } = overlayStore();
  const { isShowLoading } = loadingStore();
  const { user } = userStore();
  const location = useLocation();
  const getCategory = () => {
    let result = '';
    menuItems.forEach((item) => {
      if (item.link && item.link === location.pathname) {
        result = item.name;
      } else {
        item.childrens?.forEach((children) => {
          if (children.link === location.pathname) {
            result = children.name;
          }
        });
      }
    });
    return result;
  };
  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }} id="inventory-staff-root">
      {isShowOverlay && <Overlay />}
      {isShowLoading && <LoadingComponent />}
      <AdminSidebar menuItems={menuItems} />
      <div style={{ backgroundColor: '#f0f1f1', flex: 1, overflowX: 'hidden' }}>
        <AdminHeader category={getCategory()} user={{ hoTen: user?.fullname + '', hinhAnh: user?.image + '' }} />
        <div style={{ margin: '20px' }}>
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default DeliveryStaff;
