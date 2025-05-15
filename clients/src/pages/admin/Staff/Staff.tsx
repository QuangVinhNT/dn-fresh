import { useEffect, useState } from "react";
import './Staff.scss';
import { TfiExport } from "react-icons/tfi";
import { ButtonComponent, FilterDrawerComponent, TableComponent, TablePagination, TableSearchFilter } from "@/components";
import { IoAdd, IoCalendarOutline } from "react-icons/io5";
import { FilterType } from "@/types";
import AddStaff from "./AddStaff/AddStaff";
import StaffDetail from "./StaffDetail/StaffDetail";
import EditStaff from "./StaffDetail/EditStaff/EditStaff";
import SchedulingStaff from "./SchedulingStaff/SchedulingStaff";
import { getStaffs } from "@/api/userApi";
import { loadingStore } from "@/store";
import { Gender, Role, StaffList, UserStatus } from "@/types/User";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Trạng thái', 'Vai trò', 'Ngày tạo'];
const data = [
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  }
];

const filtersData: FilterType[] = [
  {
    query: 'status',
    name: 'Trạng thái',
    values: [
      {
        valueName: 'Đang giao dịch',
        value: 'trading'
      },
      {
        valueName: 'Ngừng giao dịch',
        value: 'notTrading'
      }
    ]
  },
  {
    query: 'productType',
    name: 'Phân loại',
    values: [
      {
        valueName: 'Sản phẩm thường',
        value: 'normal'
      },
      {
        valueName: 'Serial',
        value: 'serial'
      },
      {
        valueName: 'Lô - Hạn sử dụng',
        value: 'expireDate'
      },
      {
        valueName: 'Combo',
        value: 'combo'
      }
    ]
  }
];

const Staff = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowScheduling, setIsShowScheduling] = useState(false);
  const [staffs, setStaffs] = useState<StaffList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchStaffs();
  }, [limit, page]);

  const fetchStaffs = async () => {
    showLoading();
    try {
      const response = await getStaffs(page, limit);
      setStaffs(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };
  return (
    <>
      {(!isShowAdd && !isShowEdit && !isShowDetail && !isShowScheduling) && (
        <div className="staff-component">
          <div className="staff-header">
            <div className="staff-header-tools">
              <div className="export-file">
                <TfiExport className="icn-download" />
                <span>Xuất file</span>
              </div>
              <div className="scheduling" onClick={() => { setIsShowScheduling(true); }}>
                <IoCalendarOutline className="icn-scheduling" />
                <span>Phân lịch</span>
              </div>
            </div>
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm nhân viên"
              variant="primary"
              affix={<IoAdd className="icn-add" />}
              onClick={() => { setIsShowAdd(true); }}
            />
          </div>
          <div className="table-component">
            <TableSearchFilter searchPlaceholder="Tìm theo tên nhân viên, mã nhân viên" setIsShowFilter={setIsShowFilter} />
            <table className="table">
              <thead>
                <tr className="tb-header-row">
                  {headers.map((value, index) => (
                    <th key={index} className="table-data">
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffs?.map((staff, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => { 
                    // handleClickRow(product.id); 
                    }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{staff.id}</span>
                    </td>                    
                    <td>
                      <span>{staff.fullname}</span>
                    </td>
                    <td>
                      <span>{dateFormatter.format(new Date(staff.dob))}</span>
                    </td>
                    <td>
                      <span>{Gender[staff.gender]}</span>
                    </td>
                    <td>
                      <span>{UserStatus[staff.status]}</span>
                    </td>
                    <td>
                      <span>{Role[staff.roleId as keyof typeof Role]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(staff.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
            <FilterDrawerComponent filters={filtersData} isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter} />
          </div>
        </div>
      )}

      {isShowAdd && <AddStaff setIsShowAdd={setIsShowAdd} />}

      {isShowDetail && <StaffDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowEdit && <EditStaff setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowScheduling && <SchedulingStaff setIsShowScheduling={setIsShowScheduling} />}
    </>
  );
};

export default Staff;
