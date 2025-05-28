import { getAdminProductById, getAdminProducts } from "@/api/productApi";
import { FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { AdminProductDetail, AdminProductList, ProductPackage, ProductStatus } from "@/types/Product";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddFood from "./AddFood/AddFood";
import EditFood from "./FoodDetail/EditFood/EditFood";
import FoodDetail from "./FoodDetail/FoodDetail";
import './FoodList.scss';

const headers = ['Sản phẩm', 'Ảnh', 'Loại', 'Tồn kho', 'Đơn vị tính', 'Ngày khởi tạo', 'Trạng thái'];



const FoodList = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEditFood, setIsShowEditFood] = useState(false);
  const [isShowAddFood, setIsShowAddFood] = useState(false);
  const [products, setProducts] = useState<AdminProductList[]>([]);
  const [product, setProduct] = useState<AdminProductDetail>();
  const [productPackages, setProductPackages] = useState<ProductPackage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    const categoryFilter = filters.find(filter => filter.name === 'category')?.value;
    fetchProducts(statusFilter, categoryFilter);
  }, [limit, page, keywordRef.current, filters]);

  const fetchProducts = async (status?: string, category?: string) => {
    showLoading();
    try {
      const response = await getAdminProducts(page, limit, keywordRef.current, status, category);
      setProducts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = async (productId: string) => {
    try {
      const response = await getAdminProductById(productId);
      setProduct(response.product);
      setProductPackages(response.productPackages);
      setIsShowDetail(true);
    } catch (error) {
      console.error('Error when get product:', error);
    }
  };

  return (
    <>
      {/* Food List */}
      {(!isShowDetail && !isShowEditFood && !isShowAddFood && products) && (
        <div className="food-list-component">
          <div className="food-list-tool">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <button className="add-food" onClick={() => {
              setIsShowAddFood(true);
            }}>
              <IoAdd />
              Thêm thực phẩm
            </button>
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
                    },
                    {
                      name: 'Tạm hết hàng',
                      value: 2,
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
                      name: 'Rau củ',
                      value: 'DM001',
                    },
                    {
                      name: 'Thịt',
                      value: 'DM002',
                    },
                    {
                      name: 'Thủy - hải sản',
                      value: 'DM003',
                    },
                    {
                      name: 'Trái cây',
                      value: 'DM004',
                    }
                  ]}
                  filterType={{
                    name: 'Loại thực phẩm',
                    value: 'category'
                  }}
                  setFilters={setFilters}
                />
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập tên thực phẩm..." onSearch={fetchProducts} keywordRef={keywordRef} />
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
                {products?.map((product, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => { handleClickRow(product.maThucPham); }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{product.tenThucPham}</span>
                    </td>
                    <td>
                      <img src={product.hinhAnh[0]} alt="" />
                    </td>
                    <td>
                      <span>{product.tenDanhMuc}</span>
                    </td>
                    <td>
                      <span>{product.soLuongTonKho}</span>
                    </td>
                    <td>
                      <span>{product.donViTinh}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(product.ngayTao + '')}</span>
                    </td>
                    <td>
                      <span>{ProductStatus[product.trangThai]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>
        </div>
      )}

      {/* Food Detail */}
      {isShowDetail && <FoodDetail setIsShowDetail={setIsShowDetail} detailData={product} setIsShowEditFood={setIsShowEditFood} packageData={productPackages} onDelete={fetchProducts}/>}


      {/* Edit food component */}
      {isShowEditFood && <EditFood setIsShowDetail={setIsShowDetail} setIsShowEditFood={setIsShowEditFood} data={product} onEdited={fetchProducts} />}

      {/* Add food component */}
      {isShowAddFood && <AddFood setIsShowAddFood={setIsShowAddFood} onAdded={fetchProducts} />}
    </>
  );
};

export default FoodList;
