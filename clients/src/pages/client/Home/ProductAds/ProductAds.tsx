import { Link } from "react-router-dom";
import './ProductAds.scss'

interface IProps {
  imgSrc: string;
  link?: string;
}

const ProductAds = (props: IProps) => {
  const {imgSrc, link} = props
  return (
    <div className="product-ads-component">
      <Link to={link ?? ''}>
        <img src={imgSrc} alt="" />
      </Link>
    </div>
  )
}

export default ProductAds
