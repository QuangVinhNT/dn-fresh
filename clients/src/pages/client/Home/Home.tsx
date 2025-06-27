import CategoryImg1 from '@/assets/images/cate-1.png';
import CategoryImg2 from '@/assets/images/cate-2.png';
import CategoryImg3 from '@/assets/images/cate-3.png';
import CategoryImg4 from '@/assets/images/cate-4.png';
import CategoryImg5 from '@/assets/images/cate-5.png';
import { getDiscountProducts, getProducts } from "@/api/productApi";
import BgCate1 from '@/assets/images/bg-cate-1.png';
import BgCate2 from '@/assets/images/bg-cate-2.png';
import BgCate3 from '@/assets/images/bg-cate-3.png';
import BgDeliExpress from '@/assets/images/bg_delivery_express.png';
import CategoryImg6 from '@/assets/images/cate-6.png';
import BannerImg from '@/assets/images/home-banner.png';
import ProductAds1 from '@/assets/images/prd-ads-1.png';
import ProductAds2 from '@/assets/images/prd-ads-2.png';
import { loadingStore } from "@/store";
import { ProductList } from "@/types/Product";
import { useEffect, useState } from "react";
import BaseProduct from "./BaseProduct/BaseProduct";
import CategoryCard from "./CategoryCard/CategoryCard";
import DiscountCard from "./DiscountCard/DiscountCard";
import './Home.scss';
import ProductAds from "./ProductAds/ProductAds";

const Home = () => {
  const [discountProducts, setDiscountProducts] = useState<ProductList[]>([]);
  const [fruits, setFruits] = useState<ProductList[]>([]);
  const [vegetables, setVegetables] = useState<ProductList[]>([]);
  const [meats, setMeats] = useState<ProductList[]>();

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchDiscountProducts();
    fetchFruits();
    fetchVegetables();
    fetchMeats();
  }, []);

  const fetchDiscountProducts = async () => {
    showLoading();
    try {
      const response = await getDiscountProducts();
      setDiscountProducts(response);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchFruits = async () => {
    showLoading();
    try {
      const response = await getProducts(1, 4, 'DM006', { columnName: 'p.tenThucPham', direction: 'ASC' }, '');
      setFruits(response.data);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchVegetables = async () => {
    showLoading();
    try {
      const response = await getProducts(1, 4, 'DM001', { columnName: 'p.tenThucPham', direction: 'ASC' }, '');
      setVegetables(response.data);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const fetchMeats = async () => {
    showLoading();
    try {
      const response = await getProducts(1, 4, 'DM002', { columnName: 'p.tenThucPham', direction: 'ASC' }, '');
      setMeats(response.data);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="home-component">
      <div className="home-content">

        {/* Banner */}
        <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
          <p>
            Thực phẩm tươi ngon 4 mùa <br />
            <span>Chúng tôi cung cấp sản phẩm hữu cơ chất lượng cao</span>
          </p>
        </div>

        {/* Base category */}
        <div className="base-category">
          <CategoryCard imgSrc={CategoryImg1} label="Thịt" />
          <CategoryCard imgSrc={CategoryImg2} label="Thủy - hải sản" />
          <CategoryCard imgSrc={CategoryImg3} label="Rau củ" />
          <CategoryCard imgSrc={CategoryImg4} label="Trứng" />
          <CategoryCard imgSrc={CategoryImg5} label="Gia vị" />
          <CategoryCard imgSrc={CategoryImg6} label="Trái cây" />
        </div>

        {/* Discount */}
        {discountProducts?.length > 0 && (
          <div className="discount">
            <span className="title">Ưu đãi trong tuần</span>
            {discountProducts.map((product, idx) => (
              <DiscountCard key={idx} id={product.maThucPham} imgSrc={product.hinhAnh[0]} label={product.tenThucPham} standardPrice={product.donGia} discount={product.tiLeKhuyenMai} className="category-item" />
            ))}
          </div>
        )}

        {/* Product Ads */}
        <div className="prd-ads">
          <ProductAds imgSrc={ProductAds1} />
          <ProductAds imgSrc={ProductAds2} />
        </div>

        {/* Base product */}
        <div className="base-product">
          {fruits && (
            <BaseProduct
              categoryImg={BgCate1}
              categoryName="Trái cây"
              items={fruits}
            />
          )}
          {vegetables && (
            <BaseProduct
              categoryImg={BgCate2}
              categoryName="Rau củ quả"
              items={vegetables}
              reverse
            />
          )}
          {meats && (
            <BaseProduct
              categoryImg={BgCate3}
              categoryName="Thịt"
              items={meats}
            />
          )}
        </div>

        {/* Delivery Banner */}
        <div className="delivery-banner" style={{ backgroundImage: `url(${BgDeliExpress})` }}>
          <p>Giao hàng miễn phí tận nhà trong vòng 24 giờ</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
