import { getStaffs } from "@/api/userApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { Gender, Role, StaffList, UserStatus } from "@/types/User";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoCalendarOutline, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddStaff from "./AddStaff/AddStaff";
import SchedulingStaff from "./SchedulingStaff/SchedulingStaff";
import './Staff.scss';
import EditStaff from "./StaffDetail/EditStaff/EditStaff";
import StaffDetail from "./StaffDetail/StaffDetail";

const headers = ['Mã người dùng', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Trạng thái', 'Vai trò', 'Ngày tạo'];

const Staff = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowScheduling, setIsShowScheduling] = useState(false);
  const [staffs, setStaffs] = useState<StaffList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    const roleFilter = filters.find(filter => filter.name === 'role')?.value;
    fetchStaffs(statusFilter, roleFilter);
  }, [limit, page, filters]);

  const fetchStaffs = async (status?: string, roleId?: string) => {
    showLoading();
    try {
      const response = await getStaffs(page, limit, keywordRef.current, status, roleId);
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
            <div className="filter">
              <h3><IoFilter /> Bộ lọc</h3>
              <div className="filter-list">
                <FilterComponent
                  filterItems={[
                    {
                      name: 'Vô hiệu hóa',
                      value: 0,
                    },
                    {
                      name: 'Hoạt động',
                      value: 1,
                    }
                  ]}
                  filterType={{
                    name: 'Trạng thái',
                    value: 'status'
                  }}
                  setFilters={setFilters}
                />
                <FilterComponent
                  filterItems={[
                    {
                      name: 'Quản trị viên',
                      value: 'VT001',
                    },
                    {
                      name: 'Nhân viên kho',
                      value: 'VT002',
                    },
                    {
                      name: 'Nhân viên giao hàng',
                      value: 'VT003',
                    }
                  ]}
                  filterType={{
                    name: 'Vai trò',
                    value: 'role'
                  }}
                  setFilters={setFilters}
                />
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập mã nhân viên..." onSearch={fetchStaffs} keywordRef={keywordRef} />
            </div>
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
                      <span>{staff.maNguoiDung}</span>
                    </td>                    
                    <td>
                      <span>{staff.hoTen}</span>
                    </td>
                    <td>
                      <span>{dateFormatter.format(new Date(staff.ngaySinh))}</span>
                    </td>
                    <td>
                      <span>{Gender[staff.gioiTinh]}</span>
                    </td>
                    <td>
                      <span>{UserStatus[staff.trangThai]}</span>
                    </td>
                    <td>
                      <span>{Role[staff.maVaiTro as keyof typeof Role]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(staff.ngayTao + '')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
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
