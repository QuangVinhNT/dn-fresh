import { getProducts } from "@/api/productApi";
import { AdminContainerComponent, ButtonComponent, InputComponent } from "@/components";
import { overlayStore } from "@/store";
import { FormValues } from "@/types/Object";
import { ProductList, ProductStatus } from "@/types/Product";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import './ISAddProduct.scss';
import { InsertProductToImportReceiptPayload } from "@/types/ImportReceiptDetail";
import { insertProductToImportReceipt } from "@/api/importReceiptApi";

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  importReceiptId: string;
  onAdded: () => void;
}

const ISAddProduct = (props: IProps) => {
  const { setIsShowAdd, onAdded, importReceiptId } = props;
  const [products, setProducts] = useState<ProductList[]>([]);
  const [product, setProduct] = useState<ProductList>();

  const { hideOverlay } = overlayStore();

  const { register, reset, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: InsertProductToImportReceiptPayload = {
      maThucPham: product?.maThucPham + '',
      ngaySanXuat: new Date(data['mfg'] + ''),
      hanSuDung: new Date(data['exp'] + ''),
      donGiaNhap: +data['price'],
      soLuong: +data['quantity']
    }
    const insertResult = await insertProductToImportReceipt(importReceiptId, payload);
    console.log('Insert result:', insertResult);
    setIsShowAdd(false);
    hideOverlay();
    setProduct(undefined);
    setProducts([])
    reset();
    onAdded();
  };

  const fetchProductsByName = async (productName: string) => {
    try {
      if (productName === '') {
        setProducts([]);
      } else {
        const response = await getProducts(1, 5, '', { columnName: 'p.tenThucPham', direction: 'ASC' }, productName);
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error when get product:', error);
    }
  };

  return (
    <div className="add-import-food-component">
      <form className="add-import-food-body" onSubmit={handleSubmit(onSubmit)}>
        <AdminContainerComponent
          title='Thông tin thực phẩm'
          className="info-container"
          extraTitle={
            <div className="save-close">
              <ButtonComponent
                label='Lưu'
                type="submit"
                className="save-btn"
                variant="primary"
              />
              <div className="close-btn">
                <IoClose size={28} className="close-icon" onClick={() => {
                  setIsShowAdd(false);
                  hideOverlay();
                  reset();
                  setProducts([]);
                }} />
              </div>
            </div>
          }
          children={
            <div className="import-food-info">
              <InputComponent
                name="product-name"
                className="product-name"
                register={register}
                title="Tên thực phẩm"
                placeholder="Nhập tên thực phẩm"
                isRequired
                isSearch
                onChange={(e) => {
                  setProduct(undefined);
                  fetchProductsByName(e.target.value);
                }}
                searchResult={
                  (products.length > 0 && !product && <ul className="product-results-search">
                    {products.map((product, idx) => (
                      <li key={idx} onClick={() => {
                        setProduct(product);
                        setValue('product-name', product.tenThucPham);
                      }}>
                        {product.tenThucPham}
                      </li>
                    ))}
                  </ul>)
                }
              />
              {product && (
                <div className="detail-info">
                  <InputComponent
                    name="prd-code"
                    title="Mã thực phẩm"
                    placeholder={product.maThucPham}
                    isReadOnly
                  />
                  <InputComponent
                    name="status"
                    title="Trạng thái"
                    placeholder={ProductStatus[+product.trangThai]}
                    isReadOnly
                  />
                  <InputComponent
                    name="unit"
                    title="Đơn vị tính"
                    placeholder={product.donViTinh}
                    isReadOnly
                  />
                </div>
              )}
              <div className="other-info">
                <InputComponent
                  name="mfg"
                  register={register}
                  title="Ngày sản xuất"
                  type="date"
                  isRequired
                />
                <InputComponent
                  name="exp"
                  register={register}
                  title="Hạn sử dụng"
                  type="date"
                  isRequired
                />
                <InputComponent
                  name="price"
                  register={register}
                  title="Đơn giá nhập"
                  placeholder="Nhập đơn giá"
                  isRequired
                  suffix={`VND/${product ? product.donViTinh : ''}`}
                />
                <InputComponent
                  name="quantity"
                  register={register}
                  title="Số lượng"
                  placeholder="Nhập số lượng"
                  isRequired
                  suffix={product ? product.donViTinh : ''}
                />
              </div>
            </div>
          }
        />
      </form>
    </div>
  );
};

export default ISAddProduct;
