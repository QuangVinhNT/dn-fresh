import { ReactNode, useState } from "react";
import webColors from "../../../../constants/webColors";
import { SpaceComponent, TextComponent } from "../../..";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";
import './style.css';
import { Link } from "react-router-dom";

interface ChildrenType {
  name: string;
  link: string;
}

interface Props {
  text: string;
  link?: string | undefined;
  affix?: ReactNode;
  childrens?: ChildrenType[];
  location?: string;
  onClick?: () => void;
}
const AdminSidebarItem = (props: Props) => {
  const { text, affix, childrens, link, location, onClick } = props;
  const [isShowChild, setIsShowChild] = useState(false);
  return (
    <div onClick={onClick}>
      <Link to={link ?? '#'} style={{ textDecoration: 'none' }}>
        <div className="sidebar-item-container" style={{
          color: webColors.white,
          backgroundColor: location === link ? webColors.adminPrimary : undefined,
        }}
          onClick={() => {
            setIsShowChild(!isShowChild);
          }}
        >
          <div className="sidebar-item-content">
            {affix && affix}
            <SpaceComponent width={10} />
            <TextComponent text={text} fontSize={14} color={webColors.white} fontWeight={500} />
          </div>
          {childrens && childrens?.length > 0 && (isShowChild ? <IoChevronDownOutline /> : <IoChevronForwardOutline />)}
        </div>
      </Link>
      {childrens && childrens?.length > 0 && isShowChild &&
        childrens.map((item, index) => (
          <div className="sidebar-item-child-container" key={index}>
            <SpaceComponent width={42} />
            <Link to={item.link} className="sidebar-item-child-content" style={{
              color: location === item.link ? webColors.adminPrimary : undefined
            }}>{item.name}</Link>
          </div>
        ))
      }
    </div>
  );
};

export default AdminSidebarItem;
