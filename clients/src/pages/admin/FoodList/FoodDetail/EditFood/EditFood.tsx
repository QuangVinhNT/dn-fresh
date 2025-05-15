import { AdminContainerComponent, BackComponent, ButtonComponent, CheckboxComponent, ImageSlider, InputComponent, SelectComponent, TextComponent, UploadImgComponent } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import './EditFood.scss';
import { AdminProductDetail } from "@/types";
import { useEffect, useState } from "react";
import { SelectBox } from "@/types/ComponentType";
import { getCategoriesForSelectBox } from "@/api/categoryApi";
import { loadingStore } from "@/store";
import FoodImage from "@/pages/client/ClientFoodDetail/FoodImage/FoodImage";
import { postUploadFile } from "@/api/uploadApi";
import { getProvidersName } from "@/api/providerApi";
import { UpdateProductPayload } from "@/types/Product";

const selectItems = [
  {
    content: 'Thịt',
    value: 'Meat',
    isSelected: false,
  },
  {
    content: 'Rau củ',
    value: 'Vegetable',
    isSelected: true,
  },
  {
    content: 'Trái cây',
    value: 'Fruit',
    isSelected: false,
  }
];

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const fileArray = data['food-img'];
    let imageUrls = [];
    if (fileArray.length > 0 && fileArray instanceof FileList) {
      imageUrls = await handleUpload(fileArray);
    }
    const payload: UpdateProductPayload = {
      name: data['food-name'].toString(),
      price: +data['food-price'],
      categoryId: data['food-type'].toString(),
      description: data['food-desc'].toString(),
      unit: data['food-unit'].toString(),
      imageUrls: imageUrls.length > 0 ? imageUrls.map((image: { url: string, type: string; }) => image.url) : [],
      discountRate: +data['food-discount']/100,
      status: +data['food-status']
    };
    console.log(payload);
    // setIsShowDetail(false);
    // setIsShowEditFood(false);
    // onEdited();
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
            text={data?.name}
            title
          />
          <form className="edit-food-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="food-image">
              <ImageSlider images={data.imageUrls} />
              <UploadImgComponent id="edit-food-img-upload" name="food-img" register={register} watch={watch} />
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
                    placeholder={data.id}
                  />

                  <InputComponent
                    className="food-name"
                    name="food-name"
                    title="Tên sản phẩm"
                    placeholder={data.name}
                    register={register}
                    defaultValue
                  />

                  <InputComponent
                    className="food-quantity"
                    name="food-quantity"
                    title="Số lượng tồn kho"
                    isReadOnly
                    placeholder={data.quantity.toString()}
                  />

                  <InputComponent
                    className="food-price"
                    name="food-price"
                    title="Giá bán"
                    placeholder={data.price.toString()}
                    register={register}
                    suffix={'VND'}
                    defaultValue
                  />

                  <InputComponent
                    className="food-unit"
                    name="food-unit"
                    title="Đơn vị tính"
                    placeholder={data.unit}
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
                    placeholder={data.categoryId}
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
                    placeholder={data.status.toString()}
                    register={register}
                    defaultValue
                  />

                  <InputComponent
                    className="food-discount"
                    name='food-discount'
                    title='Giảm giá'
                    placeholder={(data.discountRate * 100).toString()}
                    register={register}
                    defaultValue
                    suffix={'%'}
                  />

                  <InputComponent
                    className="food-desc"
                    name="food-desc"
                    title="Mô tả"
                    placeholder={data.description}
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
