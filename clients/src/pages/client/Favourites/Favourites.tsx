import { ClientBanner, ProductCard } from "@/components";
import './Favourites.scss';
import ProductImg1 from '@/assets/images/sp1.png';
import { useEffect, useState } from "react";
import { ProductList } from "@/types/Product";
import { loadingStore } from "@/store";
import { getFavouriteProducts } from "@/api/favouriteProductApi";
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
  const [products, setProducts] = useState<ProductList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [total, setTotal] = useState<number>(0);

   const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchFavouriteProducts()
  }, [products])

  const fetchFavouriteProducts = async () => {
    showLoading();
    try {
      const response = await getFavouriteProducts(page, limit, 'ND003');
      setProducts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="favourites-component">
      <ClientBanner label="Yêu thích" />
      <div className="favourites-content">
        <h3>Danh sách yêu thích của tôi</h3>
        <div className="favourite-list">
          {products.map((item, idx) => (
            <ProductCard 
              imgSrc={item.hinhAnh[0]}
              label={item.tenThucPham}
              standardPrice={item.donGia}
              discount={item.tiLeKhuyenMai}
              id={item.maThucPham}
              status={item.trangThai}
              key={idx}
              isFavourite
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
