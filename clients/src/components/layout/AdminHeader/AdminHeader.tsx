import { AccountUser } from "@/types/User";
import { IoNotifications } from "react-icons/io5";
import './AdminHeader.scss';

interface Props {
  category: string;
  user: AccountUser;
}
const AdminHeader = (props: Props) => {
  const { category, user } = props;
  return (
    <div className="admin-header-container">
      <div className="left-container">
        <p className="category-name">{category}</p>
      </div>
      <div className="right-container">
        <div className="tools-container">
          <div className="tool-item">
            <IoNotifications className="icon" size={32} />
          </div>
        </div>
        <div className="user-container">
          <img className="avatar-image" src={user.avatar} alt="" />
          <div className="username-container">
            <p className="username">{user.fullname}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
