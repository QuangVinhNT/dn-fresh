import { AsideBox, ClientBanner, ProductCard } from "@/components";
import './Foods.scss';
import FoodImg from '@/assets/images/sp1.png';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useState } from "react";

const cateData = [
  { label: 'Thực phẩm tươi sống', value: 'fresh-food' },
  { label: 'Thực phẩm chế biến sẵn', value: 'processed-food' },
  { label: 'Thực phẩm khô', value: 'dry-food' },
  { label: 'Thực phẩm đông lạnh', value: 'frozen-food' },
  { label: 'Thực phẩm dinh dưỡng', value: 'nutrition-food' },
  { label: 'Thực phẩm chức năng', value: 'functional-food' },
  { label: 'Thực phẩm bảo vệ sức khỏe', value: 'health-food' },
  { label: 'Thực phẩm bổ sung', value: 'supplement-food' },
  { label: 'Thực phẩm hữu cơ', value: 'organic-food' },
];

const filterDatas = [
  {
    labelType: 'Giá sản phẩm',
    filterData: [
      { label: 'Dưới 100.000đ', value: 'under-100k' },
      { label: 'Từ 100.000đ - 200.000đ', value: '100k-200k' },
      { label: 'Từ 200.000đ - 500.000đ', value: '200k-500k' },
      { label: 'Từ 500.000đ - 1.000.000đ', value: '500k-1m' },
      { label: 'Từ 1.000.000đ - 2.000.000đ', value: '1m-2m' },
      { label: 'Trên 2.000.000đ', value: 'over-2m' },
    ]
  }
];

const foodData = [
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
  {
    imgSrc: FoodImg,
    discount: 0.41,
    label: 'Đào đỏ Mỹ',
    standardPrice: 68000,
  },
];

const Foods = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  return (
    <div className="foods-component">
      <ClientBanner label="Thực phẩm" />
      <div className="foods-content">
        <div className="aside-components">
          <AsideBox title="Danh mục thực phẩm" type="category" cateData={cateData} />
          <AsideBox title="Lọc sản phẩm" type="checkbox-filter" filterData={filterDatas} />
        </div>
        <div className="sort-foods">
          <div className="sort">
            <span>Xếp theo:</span>
            <div className="sort-item">
              <input type="radio" name="sort" id="az" />
              <label htmlFor="az">Tên A - Z</label>
            </div>
            <div className="sort-item">
              <input type="radio" name="sort" id="za" />
              <label htmlFor="za">Tên Z - A</label>
            </div>
            <div className="sort-item">
              <input type="radio" name="sort" id="price-min-max" />
              <label htmlFor="price-min-max">Giá thấp đến cao</label>
            </div>
            <div className="sort-item">
              <input type="radio" name="sort" id="price-max-min" />
              <label htmlFor="price-max-min">Giá cao đến thấp</label>
            </div>
          </div>
          <div className="foods">
            <div className="foods-item">
              {foodData.map((food, index) => <ProductCard imgSrc={food.imgSrc} label={food.label} standardPrice={food.standardPrice} discount={food.discount} key={index} />)}
            </div>
            <div className="pagination">
              <span><IoChevronBackOutline /></span>
              <span className="active">1</span>
              <span>2</span>
              <span>3</span>
              <span><IoChevronForwardOutline /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foods;
