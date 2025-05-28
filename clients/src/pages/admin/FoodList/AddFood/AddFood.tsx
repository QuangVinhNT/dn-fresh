import { postUploadFile } from "@/api/uploadApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent, UploadImgComponent } from "@/components";
import webColors from "@/constants/webColors";
import { loadingStore } from "@/store";
import { SelectBox } from "@/types/ComponentType";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './AddFood.scss';
import { getCategoriesForSelectBox } from "@/api/categoryApi";
import { insertProduct } from "@/api/productApi";
import { InsertProductPayload } from "@/types/Product";

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

interface IProps {
  setIsShowAddFood: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

const AddFood = (props: IProps) => {
  const { setIsShowAddFood, onAdded } = props;
  const [categories, setCategories] = useState<SelectBox[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const { showLoading, hideLoading } = loadingStore();

  const { register, watch, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const fileArray = data['food-img'];
    if (fileArray instanceof FileList) {
      const imageUrls = await handleUpload(fileArray);
      const payload: InsertProductPayload = {
        tenThucPham: data['food-name'].toString(),
        donGia: +data['food-price'],
        maDanhMuc: data['food-type'].toString(),
        moTa: data['food-desc'].toString(),
        donViTinh: data['food-unit'].toString(),
        hinhAnh: imageUrls.map((image: { url: string, type: string; }) => image.url),
      };
      const insertResult = await insertProduct(payload);
      console.log('Insert result:', insertResult);
      setIsShowAddFood(false);
      onAdded();
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

  const fetchCategories = async () => {
    showLoading();
    try {
      const response = await getCategoriesForSelectBox();
      const data = response.map((item, idx) => ({
        value: item.id,
        content: item.name,
        isSelected: idx === 0
      }));
      setCategories(data);
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {categories && (
        <div className="add-food-component">
          <BackComponent onBack={() => setIsShowAddFood(false)} backTitle="Quay lại danh sách thực phẩm" />
          <form className="add-food-content" onSubmit={handleSubmit(onSubmit)}>
            <div className="body">
              <AdminContainerComponent
                title="Thông tin chung"
                className="general-info-container"
                children={
                  <div className="general-info">
                    <InputComponent
                      className="food-name"
                      name="food-name"
                      placeholder="Nhập tên thực phẩm"
                      title="Tên thực phẩm"
                      register={register}
                    />
                    <InputComponent
                      className="food-price"
                      name="food-price"
                      placeholder="Nhập giá bán (VND)"
                      title="Giá bán"
                      register={register}
                      suffix={'VND'}
                    />
                    <InputComponent
                      className="food-unit"
                      name="food-unit"
                      placeholder="Nhập đơn vị tính"
                      title="Đơn vị tính"
                      register={register}
                    />
                    <InputComponent
                      className="food-desc"
                      name="food-desc"
                      placeholder="Nhập mô tả thực phẩm"
                      title="Mô tả"
                      isTextarea
                      register={register}
                    />
                  </div>
                }
              />
              <AdminContainerComponent
                title="Thông tin bổ sung"
                className="additional-info-container"
                children={
                  <div className="additional-info">
                    <SelectComponent
                      items={categories}
                      className="food-type"
                      name="food-type"
                      title="Loại thực phẩm"
                      register={register}
                    />

                    <UploadImgComponent
                      id="add-food-img-upload"
                      name="food-img"
                      register={register}
                      watch={watch}
                      title="Ảnh thực phẩm (tối đa 4 ảnh)"
                    />
                  </div>
                }
              />
            </div>
            <div className="footer">
              <ButtonComponent
                className="btn-cancel"
                label="Hủy"
                styles={{
                  color: webColors.adminPrimary,
                  border: `1px solid ${webColors.adminPrimary}`
                }}
                type="no-submit"
              />
              <ButtonComponent
                className="btn-save"
                label="Lưu"
                variant="primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddFood;
