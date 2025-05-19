import { getProductById } from "@/api/productApi";
import FoodService1 from '@/assets/images/service_1.png';
import FoodService2 from '@/assets/images/service_2.png';
import FoodService3 from '@/assets/images/service_3.png';
import FoodService4 from '@/assets/images/service_4.png';
import FoodImg2 from '@/assets/images/sp1-2.png';
import FoodImg3 from '@/assets/images/sp1-3.png';
import { default as FoodImg, default as FoodImg1 } from '@/assets/images/sp1.png';
import { ClientBanner, ProductCard } from "@/components";
import { loadingStore } from "@/store";
import { ProductDetail } from "@/types/Product";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import './ClientFoodDetail.scss';
import FoodImage from "./FoodImage/FoodImage";

const product = {
  foodImg: [FoodImg1, FoodImg2, FoodImg3],
  foodName: 'Đào đỏ Mỹ',
  standardPrice: 68000,
  discount: 0.41,
  description: 'Đào (danh pháp khoa học: Prunus persica) là một loài cây được trồng để lấy quả hay hoa. Nó là một loài cây sớm rụng lá, thân gỗ nhỏ, có thể cao tới 5–10 m.',
  unit: 'kg'
};

const foodCommits = [
  {
    imgLink: FoodService1,
    label: '100% tự nhiên'
  },
  {
    imgLink: FoodService2,
    label: 'Chứng nhận ATTP'
  },
  {
    imgLink: FoodService3,
    label: 'Luôn luôn tươi mới'
  },
  {
    imgLink: FoodService4,
    label: 'An toàn cho sức khỏe'
  }
];

const foodData = [
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
];

const ClientFoodDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail>();
  const [foodQuantity, setFoodQuantity] = useState(1);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    showLoading();
    try {
      const response = await getProductById(id as string);
      setProduct(response);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  console.log(product);

  return (
    <>
      {product && (
        <div className="client-food-detail-component">
          <ClientBanner label="Chi tiết thực phẩm" />
          <div className="client-food-detail-content">
            <div className="main-food-detail">
              <FoodImage images={product.imageUrls} />
              <div className="food-info">
                {/* Food name */}
                <span className="food-name">{product.name}</span>

                {/* Food price */}
                <div className="food-price">
                  <span className="discount-price">
                    {+product.discountRate !== 0 ?
                      SeparateNumber(product.price - product.price * +product.discountRate) : SeparateNumber(product.price)
                    }₫
                  </span>
                  {+product.discountRate !== 0 && (
                    <span className="standard-price">
                      {SeparateNumber(product.price)}₫
                    </span>
                  )}
                </div>
                {+product.discountRate !== 0 && (
                  <span className="money-save">Tiết kiệm: <b>{SeparateNumber(product.price - product.price * +product.discountRate)}₫</b> so với giá thị trường</span>
                )}

                {/* Food description */}
                <p className="food-description">{product.description}</p>

                {/* Food quantity */}
                <div className="food-quantity-container">
                  <span className="title">Số lượng ({product.unit}):</span>
                  <div className="quantity-buy">
                    <button className={`btn-minus ${product.status !== 1 && 'disabled disabled-color'}`} disabled={product.status !== 1} onClick={() => {
                      foodQuantity > 1 && setFoodQuantity(foodQuantity - 1);
                    }}>
                      <IoRemoveOutline />
                    </button>
                    <input type="number" className="food-quantity no-spinner" value={foodQuantity} onChange={(e) => setFoodQuantity(+e.target.value)} />
                    <button className={`btn-plus ${product.status !== 1 && 'disabled disabled-color'}`} disabled={product.status !== 1} onClick={() => {
                      foodQuantity < 999 && setFoodQuantity(foodQuantity + 1);
                    }}>
                      <IoAddOutline />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button className={`btn-add-to-cart ${product.status !== 1 && 'disabled disabled-color disabled-bg-color'}`} disabled={product.status !== 1}>{product.status === 1 ? 'Thêm vào giỏ hàng' : 'Tạm hết hàng'}</button>
              </div>
              <div className="food-commit">
                {foodCommits.map((item, idx) => (
                  <div className="food-commit-item" key={idx}>
                    <img src={item.imgLink} alt="" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food history */}
            <div className="food-view-history">
              <h1>Sản phẩm đã xem</h1>
              <div className="food-view-history-items">
                {foodData.map((item, idx) => (
                  <ProductCard key={idx} imgSrc={item.imgSrc} label={item.label} standardPrice={item.standardPrice} discount={item.discount} id={''} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientFoodDetail;
