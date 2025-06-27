import { IoHeartOutline, IoInformationCircleOutline } from "react-icons/io5";
import './DiscountCard.scss';
import SeparateNumber from "@/utils/separateNumber";
import { Link } from "react-router-dom";

interface IProps {
  id: string;
  imgSrc: string;
  discount?: number;
  label: string;
  standardPrice: number;
  className?: string;
}

const DiscountCard = (props: IProps) => {
  const { imgSrc, discount, label, standardPrice, className, id } = props;
  return (
    <Link to={`/foods/${id}`} className={`discount-card-component ${className}`}>
      {discount && <span className="discount-tag">- {(discount * 100).toFixed(0)}%</span>}
      <div className="prd-img">
        <img src={imgSrc} alt="" />
        <div className="tools">
          <IoHeartOutline className="fav-icon icon" size={36} color="#fff"/>
          <IoInformationCircleOutline className="info-icon icon" size={36} color="#fff"/>
        </div>
      </div>
      <div className="prd-info">
        <span className="prd-name">{label}</span>
        <div className="prd-discount">
          {discount && <span className="prd-discount-price">{SeparateNumber(standardPrice - Math.round((standardPrice * discount) / 100) * 100)} ₫</span>}
          <span className="prd-std-price">{SeparateNumber(standardPrice)} ₫</span>
        </div>
      </div>
    </Link>
  );
};

export default DiscountCard;
