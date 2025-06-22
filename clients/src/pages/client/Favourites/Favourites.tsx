import { getFavouriteProducts } from "@/api/favouriteProductApi";
import { BackComponent, ClientBanner, ProductCard } from "@/components";
import { loadingStore, userStore } from "@/store";
import { ProductList } from "@/types/Product";
import { useEffect, useState } from "react";
import './Favourites.scss';
import { useNavigate } from "react-router-dom";
const Favourites = () => {
  const [products, setProducts] = useState<ProductList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  const {user} = userStore();
  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchFavouriteProducts();
  }, []);

  const fetchFavouriteProducts = async () => {
    showLoading();
    try {
      const response = await getFavouriteProducts(page, limit, user?.id + '');
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
        <BackComponent backTitle="Trở về" onBack={() => { navigate(-1); }} />
        <h3>Danh sách yêu thích của tôi</h3>
        {products.length > 0 && (
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
                unit={item.donViTinh}
                isFavourite
                onUpdateFavourite={fetchFavouriteProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
