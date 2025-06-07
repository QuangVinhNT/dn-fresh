import { getCategoriesForSelectBox } from "@/api/categoryApi";
import { updateProduct } from "@/api/productApi";
import { postUploadFile } from "@/api/uploadApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, ImageSlider, InputComponent, SelectComponent, TextComponent, UploadImgComponent } from "@/components";
import { loadingStore } from "@/store";
import { AdminProductDetail } from "@/types";
import { SelectBox } from "@/types/ComponentType";
import { UpdateProductPayload } from "@/types/Product";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './EditFood.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEditFood: React.Dispatch<React.SetStateAction<boolean>>;
  data: AdminProductDetail | undefined;
  onEdited: () => void;
}

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const EditFood = (props: IProps) => {
  const { setIsShowDetail, setIsShowEditFood, data, onEdited } = props;
  const [categories, setCategories] = useState<SelectBox[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const { showLoading, hideLoading } = loadingStore();

  const { register, handleSubmit, reset, watch } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const fileArray = formData['food-img'];
    let imageUrls = [];
    if (fileArray.length > 0 && fileArray instanceof FileList) {
      imageUrls = await handleUpload(fileArray);
    }
    const payload: UpdateProductPayload = {
      tenThucPham: formData['food-name'].toString(),
      donGia: +formData['food-price'],
      maDanhMuc: formData['food-type'].toString(),
      moTa: formData['food-desc'].toString(),
      donViTinh: formData['food-unit'].toString(),
      hinhAnh: imageUrls.length > 0 ? imageUrls.map((image: { url: string, type: string; }) => image.url) : [],
      tiLeKhuyenMai: +formData['food-discount']/100,
      trangThai: +formData['food-status']
    };
    console.log('Form data:', formData);
    const updateResult = await updateProduct(data?.maThucPham + '', payload);
    console.log('Update result:', updateResult);
    setIsShowDetail(false);
    setIsShowEditFood(false);
    onEdited();
  };

  const fetchCategories = async () => {
    showLoading();
    try {
      const response = await getCategoriesForSelectBox();
      const data = response.map((item, idx) => ({
        value: item.maDanhMuc,
        content: item.tenDanhMuc,
        isSelected: idx === 0
      }));
      setCategories(data);
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    } finally {
      hideLoading();
    }
  };

  const handleUpload = async (files: FileList) => {
    showLoading();
    if (files.length > 0) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      try {
        const res = await postUploadFile(formData);
        if (res) {
          return res;
        }
      } catch (error) {
        console.error('Error when upload:', error);
      } finally {
        hideLoading();
      }
    }
  };

  // console.log(data);
  return (
    <>
      {data && categories && (
        <div className="edit-food-component">
          <BackComponent
            onBack={() => {
              setIsShowDetail(true);
              setIsShowEditFood(false);
            }}
            backTitle="Quay lại chi tiết thực phẩm"
          />
          <TextComponent
            text={data?.tenThucPham}
            title
          />
          <form className="edit-food-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="food-image">
              <ImageSlider images={data.hinhAnh} />
              <UploadImgComponent id="edit-food-img-upload" name="food-img" register={register} watch={watch} multiple/>
            </div>
            <AdminContainerComponent
              className="food-info-container"
              title="Thông tin thực phẩm"
              children={(
                <div className="food-info">
                  <InputComponent
                    className="food-code"
                    name="food-code"
                    title="Mã sản phẩm"
                    isReadOnly
                    placeholder={data.maThucPham}
                  />

                  <InputComponent
                    className="food-name"
                    name="food-name"
                    title="Tên sản phẩm"
                    placeholder={data.tenThucPham}
                    register={register}
                    defaultValue
                  />

                  <InputComponent
                    className="food-quantity"
                    name="food-quantity"
                    title="Số lượng tồn kho"
                    isReadOnly
                    placeholder={data.soLuongTonKho.toString()}
                  />

                  <InputComponent
                    className="food-price"
                    name="food-price"
                    title="Giá bán"
                    placeholder={data.donGia.toString()}
                    register={register}
                    suffix={'VND'}
                    defaultValue
                  />

                  <InputComponent
                    className="food-unit"
                    name="food-unit"
                    title="Đơn vị tính"
                    placeholder={data.donViTinh}
                    register={register}
                    defaultValue
                  />

                  <SelectComponent
                    items={categories}
                    className="food-type"
                    name="food-type"
                    title="Loại thực phẩm"
                    register={register}
                    defaultValue
                    placeholder={data.maDanhMuc}
                  />

                  <SelectComponent
                    className="food-status"
                    title="Trạng thái"
                    name="food-status"
                    items={[
                      {
                        content: 'Đang giao dịch',
                        value: '1',
                        isSelected: true,
                      },
                      {
                        content: 'Ngưng giao dịch',
                        value: '0',
                        isSelected: false,
                      },
                      {
                        content: 'Tạm hết hàng',
                        value: '2',
                        isSelected: false,
                      }
                    ]}
                    placeholder={data.trangThai.toString()}
                    register={register}
                    defaultValue
                  />

                  <InputComponent
                    className="food-discount"
                    name='food-discount'
                    title='Giảm giá'
                    placeholder={(data.tiLeKhuyenMai * 100).toString()}
                    register={register}
                    defaultValue
                    suffix={'%'}
                  />

                  <InputComponent
                    className="food-desc"
                    name="food-desc"
                    title="Mô tả"
                    placeholder={data.moTa}
                    register={register}
                    isTextarea
                    defaultValue
                  />

                  <div className="food-info-footer">
                    <ButtonComponent
                      onClick={() => reset()}
                      className="btn-cancel"
                      label="Hủy thay đổi"
                      type="no-submit"
                    />
                    <ButtonComponent
                      label="Lưu"
                      type="submit"
                      variant="primary"
                    />
                  </div>
                </div>
              )}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EditFood;
