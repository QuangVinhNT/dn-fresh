import SeparateNumber from "@/utils/separateNumber";
import { IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import './ProductCard.scss';
import { cartStore } from "@/store/cartStore";
import { ProductStatus } from "@/types/Product";
import { deleteFavouriteProduct, insertFavouriteProduct } from "@/api/favouriteProductApi";
import { insertItemToCart } from "@/api/cartApi";
import { favouriteFoodsStore, userStore } from "@/store";
import { toast } from "react-toastify";

interface IProps {
  id: string;
  imgSrc: string;
  discount: number;
  label: string;
  standardPrice: number;
  status: number;
  unit: string;
  isFavourite?: boolean;
  onUpdateFavourite?: () => void;
}

const ProductCard = (props: IProps) => {
  const { imgSrc, discount, label, standardPrice, id, status, isFavourite, onUpdateFavourite, unit } = props;
  const { addToCart } = cartStore();
  const { addToFavouriteFoods, removeFromFavouriteFoods, favouriteFoods } = favouriteFoodsStore();
  const { user } = userStore();
  return (
    <Link to={`/foods/${id}`} className="product-card-component">
      {+discount !== 0 && <span className="discount-tag">- {(discount * 100).toFixed(0)}%</span>}
      <div className="prd-img">
        <img src={imgSrc} alt="" />
        <div className="tools">
          <div>
            {favouriteFoods.find(food => food.maThucPham === id) ? (
              <IoHeart
                className="fav-icon icon"
                size={36}
                color="#fff"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    const deleteResult = await deleteFavouriteProduct(id, user?.id + '');
                    removeFromFavouriteFoods(id);
                    toast.success(`Xóa ${label} khỏi yêu thích thành công!`);
                  } catch (error) {
                    toast.error(`Lỗi: ${error}`);
                  }
                  onUpdateFavourite && onUpdateFavourite();
                }}
              />
            ) : (
              <IoHeartOutline
                className="fav-icon icon"
                size={36}
                color="#fff"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    const insertResult = await insertFavouriteProduct(id, user?.id + '');
                    addToFavouriteFoods({
                      maThucPham: id,
                      tenThucPham: label,
                      donGia: standardPrice,
                      donViTinh: unit,
                      hinhAnh: [imgSrc],
                      tiLeKhuyenMai: discount,
                      trangThai: status
                    });
                    toast.success(`Thêm ${label} vào yêu thích thành công!`);
                  } catch (error) {
                    toast.error(`Lỗi: ${error}`);
                  }
                  onUpdateFavourite && onUpdateFavourite();
                }}
              />
            )}
          </div>
          <div>
            <IoCartOutline
              className={`cart-icon icon ${status !== 1 && 'disabled'}`}
              size={36}
              color="#fff"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  status === 1 && addToCart({ maThucPham: id, tiLeKhuyenMai: discount, hinhAnh: [imgSrc], tenThucPham: label, donGia: standardPrice, trangThai: status, soLuong: 1, donViTinh: unit });
                  const insertResult = await insertItemToCart(user?.id + '', {
                    maThucPham: id,
                    soLuong: 1
                  });
                  toast.success(`Thêm ${label} vào giỏ hàng thành công!`);
                } catch (error) {
                  toast.error(`Lỗi: ${error}`);
                }
              }} />
          </div>
        </div>
      </div>
      <div className="prd-info">
        <span className="prd-name">{label}</span>
        <div className="prd-discount">
          {status === 1 ? (
            <>
              <span className="prd-discount-price">
                {discount !== 0 ? SeparateNumber(standardPrice - Math.round((standardPrice * discount) / 100) * 100) : SeparateNumber(standardPrice)} ₫
              </span>
              {discount !== 0 && <span className="prd-std-price">{SeparateNumber(standardPrice)} ₫</span>}
            </>
          ) : (
            <span className="prd-status">
              {ProductStatus[status]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
