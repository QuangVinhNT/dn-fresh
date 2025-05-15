import { getAdminProductById, getAdminProducts } from "@/api/productApi";
import { FilterDrawerComponent, TablePagination, TableSearchFilter } from "@/components";
import { FilterType } from "@/types";
import { AdminProductDetail, AdminProductList, ProductStatus } from "@/types/Product";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddFood from "./AddFood/AddFood";
import EditFood from "./FoodDetail/EditFood/EditFood";
import FoodDetail from "./FoodDetail/FoodDetail";
import './FoodList.scss';
import { loadingStore } from "@/store";

const headers = ['Sản phẩm', 'Ảnh', 'Loại', 'Tồn kho', 'Đơn vị tính', 'Ngày khởi tạo', 'Trạng thái'];

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
  const [products, setProducts] = useState<AdminProductList[]>([]);
  const [product, setProduct] = useState<AdminProductDetail>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchProducts();
  }, [limit, page]);

  const fetchProducts = async () => {
    showLoading();
    try {
      const response = await getAdminProducts(page, limit);
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
      setProduct(response);
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
            <TableSearchFilter searchPlaceholder="Tìm theo tên sản phẩm" setIsShowFilter={setIsShowFilter} />
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
                  <tr key={idx} className="tb-body-row" onClick={() => { handleClickRow(product.id); }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{product.name}</span>
                    </td>
                    <td>
                      <img src={product.imageUrls[0]} alt="" />
                    </td>
                    <td>
                      <span>{product.category}</span>
                    </td>
                    <td>
                      <span>{product.quantity}</span>
                    </td>
                    <td>
                      <span>{product.unit}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(product.createdAt)}</span>
                    </td>
                    <td>
                      <span>{ProductStatus[product.status]}</span>
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

      {/* Food Detail */}
      {isShowDetail && <FoodDetail setIsShowDetail={setIsShowDetail} data={product} setIsShowEditFood={setIsShowEditFood} />}


      {/* Edit food component */}
      {isShowEditFood && <EditFood setIsShowDetail={setIsShowDetail} setIsShowEditFood={setIsShowEditFood} data={product} onEdited={fetchProducts}/>}

      {/* Add food component */}
      {isShowAddFood && <AddFood setIsShowAddFood={setIsShowAddFood} onAdded={fetchProducts} />}
    </>
  );
};

export default FoodList;
