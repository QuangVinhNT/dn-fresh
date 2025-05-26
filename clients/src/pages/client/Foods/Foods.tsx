import { getCategoriesForFilter } from "@/api/categoryApi";
import { getProducts } from "@/api/productApi";
import { AsideBox, ClientBanner, Pagination, ProductCard, SearchComponent } from "@/components";
import { loadingStore } from "@/store";
import { OrderBy } from "@/types";
import { CategoryFilter, CategorySelectBox } from "@/types/Category";
import { ProductList } from "@/types/Product";
import { useEffect, useRef, useState } from "react";
import './Foods.scss';

const Foods = () => {

  const [products, setProducts] = useState<ProductList[]>([]);
  const [categories, setCategories] = useState<CategoryFilter[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [total, setTotal] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>('');
  const [orderBy, setOrderBy] = useState<OrderBy>({ columnName: 'p.tenThucPham', direction: 'ASC' });

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [limit, page, categoryId, orderBy, keywordRef.current]);

  const fetchProducts = async () => {
    showLoading();
    try {
      const response = await getProducts(page, limit, categoryId, orderBy, keywordRef.current);
      setProducts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchCategories = async () => {
    showLoading();
    try {
      const response = await getCategoriesForFilter();
      setCategories(response);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="foods-component">
      <ClientBanner label="Thực phẩm" />
      <div className="foods-content">
        <div className="aside-components">
          <AsideBox title="Danh mục thực phẩm" type="category" cateData={categories} setCategoryId={setCategoryId} />
        </div>
        <div className="sort-search-foods">
          <div className="sort-search">
            <div className="sort">
              <span>Xếp theo:</span>
              <div className="sort-item" onClick={() => setOrderBy({ columnName: 'p.tenThucPham', direction: 'ASC' })}>
                <input type="radio" name="sort" id="az" defaultChecked />
                <label htmlFor="az">Tên A - Z</label>
              </div>
              <div className="sort-item" onClick={() => setOrderBy({ columnName: 'p.tenThucPham', direction: 'DESC' })}>
                <input type="radio" name="sort" id="za" />
                <label htmlFor="za">Tên Z - A</label>
              </div>
              <div className="sort-item" onClick={() => setOrderBy({ columnName: 'p.donGia', direction: 'ASC' })}>
                <input type="radio" name="sort" id="price-min-max" />
                <label htmlFor="price-min-max">Giá thấp đến cao</label>
              </div>
              <div className="sort-item" onClick={() => setOrderBy({ columnName: 'p.donGia', direction: 'DESC' })}>
                <input type="radio" name="sort" id="price-max-min" />
                <label htmlFor="price-max-min">Giá cao đến thấp</label>
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập tên thực phẩm..." onSearch={fetchProducts} keywordRef={keywordRef}/>
            </div>
          </div>
          <div className="foods">
            <div className="foods-item">
              {products.map((product, index) => <ProductCard id={product.maThucPham} imgSrc={product.hinhAnh[0]} label={product.tenThucPham} standardPrice={product.donGia} discount={+product.tiLeKhuyenMai} status={product.trangThai} key={index} />)}
            </div>
            <Pagination limit={limit} page={page} setLimit={setLimit} setPage={setPage} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foods;
