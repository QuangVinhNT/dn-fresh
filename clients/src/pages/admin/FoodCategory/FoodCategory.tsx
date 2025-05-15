import { ButtonComponent, FilterDrawerComponent, TableComponent, TablePagination, TableSearchFilter } from "@/components";
import './FoodCategory.scss';
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FilterType } from "@/types";
import FoodCategoryDetail from "./FoodCategoryDetail/FoodCategoryDetail";
import EditFoodCategory from "./FoodCategoryDetail/EditFoodCategory/EditFoodCategory";
import AddFoodCategory from "./AddFoodCategory/AddFoodCategory";
import { loadingStore } from "@/store";
import { CategoryList, CategoryStatus } from "@/types/Category";
import { getCategories } from "@/api/categoryApi";
import { datetimeFormatter } from "@/utils/datetimeFormatter";

const headers = ['Mã danh mục', 'Tên danh mục', 'Trạng thái', 'Ngày tạo', 'Số lượng thực phẩm'];

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
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchCategories();
  }, [limit, page]);

  const fetchCategories = async () => {
    showLoading();
    try {
      const response = await getCategories(page, limit);
      setCategories(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };
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
          <div className="table-component">
            <TableSearchFilter searchPlaceholder="Tìm theo mã danh mục, tên danh mục" setIsShowFilter={setIsShowFilter} />
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
                {categories?.map((category, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => { 
                    // handleClickRow(product.id); 
                    }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{category.id}</span>
                    </td>
                    <td>
                      <span>{category.name}</span>
                    </td>
                    <td>
                      <span>{CategoryStatus[category.status]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(category.createdAt)}</span>
                    </td>
                    <td>
                      <span>{category.productQuantity}</span>
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

      {isShowDetail && <FoodCategoryDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit}/>}

      {isShowEdit && <EditFoodCategory setIsShowEdit={setIsShowEdit} setIsShowDetail={setIsShowDetail}/>}

      {isShowAdd && <AddFoodCategory setIsShowAdd={setIsShowAdd}/>}
    </>
  );
};

export default FoodCategory;
