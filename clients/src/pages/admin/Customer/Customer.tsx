import { useState } from "react";
import './Customer.scss';
import { TfiExport } from "react-icons/tfi";
import { ButtonComponent, FilterDrawerComponent, TableComponent } from "@/components";
import { IoAdd } from "react-icons/io5";
import { FilterType } from "@/types";
import AddCustomer from "./AddCustomer/AddCustomer";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import EditCustomer from "./CustomerDetail/EditCustomer/EditCustomer";

const headers = ['Sản phẩm', 'Ảnh', 'Loại', 'Nhãn hiệu', 'Có thể bán', 'Tồn kho', 'Ngày khởi tạo'];
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

const Customer = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);

  return (
    <>
      {(!isShowAdd && !isShowDetail && !isShowEdit) && (
        <div className="customer-component">
          <div className="customer-header">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm khách hàng"
              variant="primary"
              affix={<IoAdd className="icn-add" />}
              onClick={() => { setIsShowAdd(true); }}
            />
          </div>
          <div className="customer-body">
            <TableComponent
              headers={headers}
              data={data}
              searchPlaceholder="Tìm mã phiếu nhập, tên nhà cung cấp,..."
              setIsShowFilter={setIsShowFilter}
              setIsShowDetail={setIsShowDetail}
            />
            <FilterDrawerComponent filters={filtersData} setIsShowFilter={setIsShowFilter} isShowFilter={isShowFilter} />
          </div>
        </div>
      )}

      {isShowAdd && <AddCustomer setIsShowAdd={setIsShowAdd}/>}
      
      {isShowDetail && <CustomerDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit}/>}

      {isShowEdit && <EditCustomer setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit}/>}
    </>
  );
};

export default Customer;
