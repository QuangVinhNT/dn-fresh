import { IoHeartOutline, IoInformationCircleOutline } from "react-icons/io5";
import './ProductCard.scss';
import SeparateNumber from "@/utils/separateNumber";
import { Link } from "react-router-dom";

interface IProps {
  imgSrc: string;
  discount?: number;
  label: string;
  standardPrice: number;
}

const ProductCard = (props: IProps) => {
  const { imgSrc, discount, label, standardPrice } = props;
  return (
    <Link to={'/foods/dao-do-my'} className="product-card-component">
      {discount && <span className="discount-tag">- {discount * 100}%</span>}
      <div className="prd-img">
        <img src={imgSrc} alt="" />
        <div className="tools">
          <IoHeartOutline className="fav-icon icon" size={36} color="#fff" />
          <Link to={'/foods/dao-do-my'}>
            <IoInformationCircleOutline className="info-icon icon" size={36} color="#fff" />
          </Link>
        </div>
      </div>
      <div className="prd-info">
        <span className="prd-name">{label}</span>
        <div className="prd-discount">
          <span className="prd-discount-price">
            {discount ? SeparateNumber(Math.round((standardPrice * discount) / 100) * 100) : SeparateNumber(standardPrice)} ₫
          </span>
          {discount && <span className="prd-std-price">{SeparateNumber(standardPrice)} ₫</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
