import { getCategories } from "@/api/categoryApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { CategoryList, CategoryStatus } from "@/types/Category";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoFilter } from "react-icons/io5";
import AddFoodCategory from "./AddFoodCategory/AddFoodCategory";
import './FoodCategory.scss';
import EditFoodCategory from "./FoodCategoryDetail/EditFoodCategory/EditFoodCategory";
import FoodCategoryDetail from "./FoodCategoryDetail/FoodCategoryDetail";

const headers = ['Mã danh mục', 'Tên danh mục', 'Trạng thái', 'Ngày tạo', 'Số lượng thực phẩm'];

const FoodCategory = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchCategories(statusFilter);
  }, [limit, page, filters]);

  const fetchCategories = async (status?: string) => {
    showLoading();
    try {
      const response = await getCategories(page, limit, keywordRef.current, status);
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
                      name: 'Ngưng giao dịch',
                      value: 0,
                    },
                    {
                      name: 'Đang giao dịch',
                      value: 1,
                    }
                  ]}
                  filterType={{
                    name: 'Trạng thái',
                    value: 'status'
                  }}
                  setFilters={setFilters}
                />
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập tên danh mục..." onSearch={fetchCategories} keywordRef={keywordRef} />
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
                {categories?.map((category, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    // handleClickRow(product.id); 
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{category.maDanhMuc}</span>
                    </td>
                    <td>
                      <span>{category.tenDanhMuc}</span>
                    </td>
                    <td>
                      <span>{CategoryStatus[category.trangThai]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(category.ngayTao + '')}</span>
                    </td>
                    <td>
                      <span>{category.soLuongThucPham}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>
        </div>
      )}

      {isShowDetail && <FoodCategoryDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowEdit && <EditFoodCategory setIsShowEdit={setIsShowEdit} setIsShowDetail={setIsShowDetail} />}

      {isShowAdd && <AddFoodCategory setIsShowAdd={setIsShowAdd} />}
    </>
  );
};

export default FoodCategory;
