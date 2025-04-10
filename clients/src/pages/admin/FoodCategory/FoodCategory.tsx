import { ButtonComponent, FilterDrawerComponent, TableComponent } from "@/components";
import './FoodCategory.scss';
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { FilterType } from "@/types";
import FoodCategoryDetail from "./FoodCategoryDetail/FoodCategoryDetail";
import EditFoodCategory from "./FoodCategoryDetail/EditFoodCategory/EditFoodCategory";
import AddFoodCategory from "./AddFoodCategory/AddFoodCategory";

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

const FoodCategory = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  return (
    <>
      {(!isShowDetail && !isShowAdd && !isShowEdit) && (
        <div className="food-category-component">
          <div className="food-category-header">
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm danh mục"
              variant="primary"
              affix={<IoAdd className="icn-add" />}
              onClick={() => {setIsShowAdd(true)}}
            />
          </div>
          <div className="food-category-body">
            <TableComponent
              searchPlaceholder="Tìm kiếm loại thực phẩm theo tên, mã loại"
              setIsShowFilter={setIsShowFilter}
              setIsShowDetail={setIsShowDetail}
              headers={['Mã danh mục', 'Tên danh mục', 'Trạng thái', 'Ngày tạo', 'Số lượng thực phẩm']}
              data={[
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                },
                {
                  categoryCode: 'DM01',
                  categoryName: 'Trái cây',
                  status: 'Đang giao dịch',
                  createDate: '04/04/2025 10:09',
                  foodQuantity: 25
                }
              ]}
            />
            <FilterDrawerComponent
              setIsShowFilter={setIsShowFilter}
              isShowFilter={isShowFilter}
              filters={filtersData}
            />
          </div>
        </div>
      )}

      {isShowDetail && <FoodCategoryDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit}/>}

      {isShowEdit && <EditFoodCategory setIsShowEdit={setIsShowEdit} setIsShowDetail={setIsShowDetail}/>}

      {isShowAdd && <AddFoodCategory setIsShowAdd={setIsShowAdd}/>}
    </>
  );
};

export default FoodCategory;
