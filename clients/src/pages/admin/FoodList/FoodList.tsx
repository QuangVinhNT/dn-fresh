import { FilterDrawerComponent, TableComponent } from "@/components";
import { FilterType } from "@/types";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddFood from "./AddFood/AddFood";
import EditFood from "./FoodDetail/EditFood/EditFood";
import FoodDetail from "./FoodDetail/FoodDetail";
import './FoodList.scss';

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


const FoodList = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEditFood, setIsShowEditFood] = useState(false);
  const [isShowAddFood, setIsShowAddFood] = useState(false);
  return (
    <>
      {/* Food List */}
      {(!isShowDetail && !isShowEditFood && !isShowAddFood) && (
        <div className="food-list-component">
          <div className="food-list-tool">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <button className="add-food" onClick={() => setIsShowAddFood(true)}>
              <IoAdd />
              Thêm thực phẩm
            </button>
          </div>
          <div className="table-component">
            <TableComponent
              headers={headers}
              data={data}
              searchPlaceholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm"
              setIsShowFilter={setIsShowFilter}
              setIsShowDetail={setIsShowDetail}
            />
            <FilterDrawerComponent filters={filtersData} isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter} />
          </div>
        </div>
      )}

      {/* Food Detail */}
      {isShowDetail && <FoodDetail setIsShowDetail={setIsShowDetail} data={data[0]} setIsShowEditFood={setIsShowEditFood} />}

      {/* Edit food component */}
      {isShowEditFood && <EditFood setIsShowDetail={setIsShowDetail} setIsShowEditFood={setIsShowEditFood} />}

      {/* Add food component */}
      {isShowAddFood && <AddFood setIsShowAddFood={setIsShowAddFood} />}
    </>
  );
};

export default FoodList;
