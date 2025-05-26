import { ProductCard } from "@/components";
import './BaseProduct.scss'
import { Link } from "react-router-dom";
import { ProductList } from "@/types/Product";

interface IProps {
  reverse?: boolean;
  items: ProductList[];
  categoryName: string;
  categoryImg: string;
}

const BaseProduct = (props: IProps) => {
  const {reverse, items, categoryImg, categoryName} = props
  const CategoryTitle = (): JSX.Element => (
    <div className="category-title-component" style={{backgroundImage: `url(${categoryImg})`}}>
      <span>{categoryName}</span>
      <Link to={'/foods'}>Mua sắm ngay bây giờ!</Link>
    </div>
  )

  return (
    <div className="base-product-component">
      {!reverse && <CategoryTitle />}
    
      {items?.map((item, index) => (
        <ProductCard key={index} id={item.maThucPham} imgSrc={item.hinhAnh[0]} standardPrice={item.donGia} label={item.tenThucPham} discount={item.tiLeKhuyenMai} status={item.trangThai}/>
      ))}

      {reverse && <CategoryTitle />}
    </div>
  )
}

export default BaseProduct
