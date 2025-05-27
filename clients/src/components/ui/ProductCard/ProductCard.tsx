import SeparateNumber from "@/utils/separateNumber";
import { IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import './ProductCard.scss';
import { cartStore } from "@/store/cartStore";
import { ProductStatus } from "@/types/Product";
import { deleteFavouriteProduct, insertFavouriteProduct } from "@/api/favouriteProductApi";

interface IProps {
  id: string;
  imgSrc: string;
  discount: number;
  label: string;
  standardPrice: number;
  status: number;
  isFavourite?: boolean;
  onUpdateFavourite?: () => void;
}

const ProductCard = (props: IProps) => {
  const { imgSrc, discount, label, standardPrice, id, status, isFavourite, onUpdateFavourite } = props;
  const { addToCart } = cartStore();
  return (
    <Link to={`/foods/${id}`} className="product-card-component">
      {discount !== 0 && <span className="discount-tag">- {discount * 100}%</span>}
      <div className="prd-img">
        <img src={imgSrc} alt="" />
        <div className="tools">
          <div>
            {isFavourite ? (
              <IoHeart
                className="fav-icon icon"
                size={36}
                color="#fff"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const deleteResult = await deleteFavouriteProduct(id, 'ND003');
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
                  const insertResult = await insertFavouriteProduct({ productId: id, userId: 'ND003' });
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                status === 1 && addToCart({ maThucPham: id, tiLeKhuyenMai: discount, hinhAnh: [imgSrc], tenThucPham: label, donGia: standardPrice, trangThai: status, soLuong: 1 });
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
