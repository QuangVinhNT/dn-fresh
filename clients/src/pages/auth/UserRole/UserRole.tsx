import './UserRole.scss';
import AdminIcon from '@/assets/images/admin-icon.png';
import CustomerIcon from '@/assets/images/customer-icon.png';
import InventoryStaffIcon from '@/assets/images/inventory-icon.png';
import DeliveryStaffIcon from '@/assets/images/delivery-icon.png';
import { useNavigate } from "react-router-dom";
const roles = [
  {
    image: CustomerIcon,
    label: 'Khách hàng',
    link: '/'
  },
  {
    image: AdminIcon,
    label: 'Quản trị viên',
    link: '/admin'
  },
  {
    image: InventoryStaffIcon,
    label: 'Nhân viên kho',
    link: '/inventory-staff'
  },
  {
    image: DeliveryStaffIcon,
    label: 'Nhân viên giao hàng',
    link: '/delivery-staff'
  },
];
const UserRole = () => {
  const navigate = useNavigate();
  return (
    <div className="user-role-component">
      <h1>Đăng nhập</h1>
      <p>Chọn loại tài khoản bạn muốn sử dụng đăng nhập</p>
      <div className="role-list">
        {roles.map((item, idx) => (
          <div className="role-item" key={idx} onClick={() => navigate(item.link)}>
             <img src={item.image} alt="" />
             <span>Tài khoản {item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRole;
