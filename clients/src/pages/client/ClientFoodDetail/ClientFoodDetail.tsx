import { getProductById } from "@/api/productApi";
import FoodService1 from '@/assets/images/service_1.png';
import FoodService2 from '@/assets/images/service_2.png';
import FoodService3 from '@/assets/images/service_3.png';
import FoodService4 from '@/assets/images/service_4.png';
import { BackComponent, ClientBanner } from "@/components";
import { loadingStore, userStore } from "@/store";
import { ProductDetail } from "@/types/Product";
import SeparateNumber from "@/utils/separateNumber";
import { useEffect, useState } from "react";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import './ClientFoodDetail.scss';
import FoodImage from "./FoodImage/FoodImage";
import { cartStore } from "@/store/cartStore";
import { insertItemToCart } from "@/api/cartApi";
import { toast } from "react-toastify";

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

const ClientFoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail>();
  const [foodQuantity, setFoodQuantity] = useState(1);

  const { showLoading, hideLoading } = loadingStore();
  const { addToCart } = cartStore();
  const { user } = userStore();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    showLoading();
    try {
      const response = await getProductById(id as string);
      setProduct(response);
      console.log(response);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {product && (
        <div className="client-food-detail-component">
          <ClientBanner label="Chi tiết thực phẩm" />
          <div className="client-food-detail-content">
            <BackComponent backTitle="Trở về" onBack={() => { navigate(-1); }} />
            <div className="main-food-detail">
              <FoodImage images={product.hinhAnh} />
              <div className="food-info">
                {/* Food name */}
                <span className="food-name">{product.tenThucPham}</span>

                {/* Food price */}
                <div className="food-price">
                  <span className="discount-price">
                    {+product.tiLeKhuyenMai !== 0 ?
                      SeparateNumber(product.donGia - Math.round((product.donGia * product.tiLeKhuyenMai) / 100) * 100) : SeparateNumber(product.donGia)
                    }₫
                  </span>
                  {+product.tiLeKhuyenMai !== 0 && (
                    <span className="standard-price">
                      {SeparateNumber(product.donGia)}₫
                    </span>
                  )}
                </div>
                {+product.tiLeKhuyenMai !== 0 && (
                  <span className="money-save">Tiết kiệm: <b>{SeparateNumber(Math.round((product.donGia * product.tiLeKhuyenMai) / 100) * 100)}₫</b> so với giá thị trường</span>
                )}

                {/* Food description */}
                <p className="food-description">{product.moTa}</p>

                {/* Food quantity */}
                <div className="food-quantity-container">
                  <span className="title">Số lượng ({product.donViTinh}):</span>
                  <div className="quantity-buy">
                    <button className={`btn-minus ${product.trangThai !== 1 && 'disabled disabled-color'}`} disabled={product.trangThai !== 1} onClick={() => {
                      foodQuantity > 1 && setFoodQuantity(foodQuantity - 1);
                    }}>
                      <IoRemoveOutline />
                    </button>
                    <input type="number" className="food-quantity no-spinner" value={foodQuantity} onChange={(e) => setFoodQuantity(+e.target.value)} />
                    <button className={`btn-plus ${product.trangThai !== 1 && 'disabled disabled-color'}`} disabled={product.trangThai !== 1} onClick={() => {
                      foodQuantity < 999 && setFoodQuantity(foodQuantity + 1);
                    }}>
                      <IoAddOutline />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  className={`btn-add-to-cart ${product.trangThai !== 1 && 'disabled disabled-color disabled-bg-color'}`}
                  disabled={product.trangThai !== 1}
                  onClick={async () => {
                    try {
                      addToCart({ ...product, soLuong: foodQuantity });
                      const insertResult = await insertItemToCart(user?.id + '', {
                        maThucPham: product.maThucPham,
                        soLuong: foodQuantity
                      });
                      toast.success(`Thêm ${product.tenThucPham} vào giỏ hàng thành công!`);
                    } catch (error) {
                      toast.error(`Lỗi: ${error}`);
                    }
                  }}
                >
                  {product.trangThai === 1 ? 'Thêm vào giỏ hàng' : 'Tạm hết hàng'}
                </button>
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
            {/* <div className="food-view-history">
              <h1>Sản phẩm đã xem</h1>
              <div className="food-view-history-items">
                {foodData.map((item, idx) => (
                  <ProductCard key={idx} imgSrc={item.imgSrc} label={item.label} standardPrice={item.standardPrice} discount={item.discount} id={''} />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ClientFoodDetail;
