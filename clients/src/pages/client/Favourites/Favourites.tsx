import { ClientBanner, ProductCard } from "@/components";
import './Favourites.scss';
import ProductImg1 from '@/assets/images/sp1.png';
const favouriteFoods: { name: string, standardPrice: number, discount?: number, image: string; }[] = [
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
  },
  {
    name: 'Đào đỏ Mỹ',
    standardPrice: 68000,
    image: ProductImg1,
    discount: 0.41,
  }
];
const Favourites = () => {
  return (
    <div className="favourites-component">
      <ClientBanner label="Yêu thích" />
      <div className="favourites-content">
        <h3>Danh sách yêu thích của tôi</h3>
        <div className="favourite-list">
          {favouriteFoods.map((item, idx) => (
            <ProductCard 
              imgSrc={item.image}
              label={item.name}
              standardPrice={item.standardPrice}
              discount={item.discount}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
