import CategoryImg1 from '@/assets/images/cate-1.png';
import BannerImg from '@/assets/images/home-banner.png';
import ProductAds1 from '@/assets/images/prd-ads-1.png';
import ProductImg1 from '@/assets/images/sp1.png';
import BaseProduct from "./BaseProduct/BaseProduct";
import CategoryCard from "./CategoryCard/CategoryCard";
import DiscountCard from "./DiscountCard/DiscountCard";
import './Home.scss';
import ProductAds from "./ProductAds/ProductAds";
import BgCate1 from '@/assets/images/bg-cate-1.png';
import BgCate2 from '@/assets/images/bg-cate-2.png';
import BgCate3 from '@/assets/images/bg-cate-3.png';
import BgDeliExpress from '@/assets/images/bg_delivery_express.png'

const productItems: { name: string, standardPrice: number, discount?: number, image: string; }[] = [
  {
    name: 'Đào đỏ Mỹ',
    standardPrice: 68000,
    image: ProductImg1,
    discount: 0.41,
  },
  {
    name: 'Đào đỏ Mỹ',
    standardPrice: 68000,
    image: ProductImg1,
    discount: 0.41,
  },
  {
    name: 'Đào đỏ Mỹ',
    standardPrice: 68000,
    image: ProductImg1,
    discount: 0.41,
  },
  {
    name: 'Đào đỏ Mỹ',
    standardPrice: 68000,
    image: ProductImg1,
    discount: 0.41,
  }
];

const Home = () => {
  return (
    <div className="home-component">
      <div className="home-content">

        {/* Banner */}
        <div className="banner" style={{backgroundImage: `url(${BannerImg})`}}>
          <p>
            Thực phẩm tươi ngon 4 mùa <br />
            <span>Chúng tôi cung cấp sản phẩm hữu cơ chất lượng cao</span>
          </p>
        </div>

        {/* Base category */}
        <div className="base-category">
          <CategoryCard imgSrc={CategoryImg1} label="Trứng và bơ"/>
          <CategoryCard imgSrc={CategoryImg1} label="Trứng và bơ"/>
          <CategoryCard imgSrc={CategoryImg1} label="Trứng và bơ"/>
          <CategoryCard imgSrc={CategoryImg1} label="Trứng và bơ"/>
          <CategoryCard imgSrc={CategoryImg1} label="Trứng và bơ"/>
          <CategoryCard imgSrc={CategoryImg1} label="Trứng và bơ"/>
        </div>

        {/* Discount */}
        <div className="discount">
          <span className="title">Ưu đãi trong tuần</span>
          <DiscountCard imgSrc={ProductImg1} label="Đào đỏ Mỹ" standardPrice={600000} discount={0.41} className="category-item"/>
          <DiscountCard imgSrc={ProductImg1} label="Đào đỏ Mỹ" standardPrice={600000} discount={0.41} className="category-item"/>
          <DiscountCard imgSrc={ProductImg1} label="Đào đỏ Mỹ" standardPrice={600000} discount={0.41} className="category-item"/>
          <DiscountCard imgSrc={ProductImg1} label="Đào đỏ Mỹ" standardPrice={600000} discount={0.41} className="category-item"/>
          <DiscountCard imgSrc={ProductImg1} label="Đào đỏ Mỹ" standardPrice={600000} discount={0.41} className="category-item"/>
        </div>

        {/* Product Ads */}
        <div className="prd-ads">
          <ProductAds imgSrc={ProductAds1} />
          <ProductAds imgSrc={ProductAds1} />
        </div>

        {/* Base product */}
        <div className="base-product">
          <BaseProduct
            categoryImg={BgCate1}
            categoryName="Trái cây"
            items={productItems}
          />
          <BaseProduct
            categoryImg={BgCate2}
            categoryName="Rau củ quả"
            items={productItems}
            reverse
          />
          <BaseProduct
            categoryImg={BgCate3}
            categoryName="Thực phẩm tươi"
            items={productItems}
          />
        </div>

        {/* Delivery Banner */}
        <div className="delivery-banner" style={{backgroundImage: `url(${BgDeliExpress})`}}>
          <p>Giao hàng miễn phí tận nhà trong vòng 24 giờ</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
