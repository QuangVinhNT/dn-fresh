import webColors from "../../../constants/webColors";
import Logo from '../../../assets/svgs/dnfresh-logo-white.svg';
import { FlexContainer, TextComponent } from "../..";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebarItem from "./AdminSidebarItem/AdminSidebarItem";
import { IoInformationCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { userStore } from "@/store";

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

interface Props {
  menuItems: MenuItem[];
}

const AdminSidebar = (props: Props) => {
  const { menuItems } = props;
  const location = useLocation();
  const { clearUser } = userStore();
  return (
    <div style={{ backgroundColor: webColors.adminBackground, width: '220px', position: 'relative', zIndex: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <FlexContainer direction="column" align="center" justify="center" styles={{ height: '65px', padding: '4px 0' }}>
        <img src={Logo} alt="" width={40} height={40} />
        <TextComponent text="DN Fresh" color={webColors.white} uppercase fontWeight={800} />
      </FlexContainer>

      {/* AdminSidebar Items */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <AdminSidebarItem key={index} text={item.name} link={item.link} affix={item.affix} childrens={item.childrens} location={location.pathname} />
          ))}
        </div>
        <div className="menu-tools">
          <AdminSidebarItem
            text="Thông tin cá nhân"
            affix={<IoInformationCircleOutline size={22} />}
            link={'/personal-info'}
          />
          <AdminSidebarItem
            text="Đăng xuất"
            affix={<IoLogOutOutline size={22} />}
            link={'/'}
            onClick={() => {
              localStorage.removeItem('access_token');
              clearUser();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
