import { ProductCard } from "@/components";
import './BaseProduct.scss'
import { Link } from "react-router-dom";

interface IProps {
  reverse?: boolean;
  items: {name: string, standardPrice: number, discount?: number, image: string}[];
  categoryName: string;
  categoryImg: string;
}

const BaseProduct = (props: IProps) => {
  const {reverse, items, categoryImg, categoryName} = props
  const CategoryTitle = (): JSX.Element => (
    <div className="category-title-component" style={{backgroundImage: `url(${categoryImg})`}}>
      <span>{categoryName}</span>
      <Link to={'/'}>Mua sắm ngay bây giờ!</Link>
    </div>
  )

  return (
    <div className="base-product-component">
      {!reverse && <CategoryTitle />}
    
      {items.map((item, index) => (
        <ProductCard key={index} imgSrc={item.image} standardPrice={item.standardPrice} label={item.name} discount={item.discount ?? undefined}/>
      ))}

      {reverse && <CategoryTitle />}
    </div>
  )
}

export default BaseProduct
