import { AdminContainerComponent, BackComponent, ButtonComponent, CheckboxComponent, InputComponent, SelectComponent, UploadImgComponent } from "@/components";
import webColors from "@/constants/webColors";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './AddFood.scss';

type QueryData = {
  [key: string]: string;
};

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
  setIsShowAddFood: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFood = (props: IProps) => {
  const { setIsShowAddFood } = props;
  const { register, watch, handleSubmit } = useForm<QueryData>();

  const onSubmit: SubmitHandler<QueryData> = (data) => console.log(data)

  return (
    <>
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
                    items={selectItems}
                    className="food-type"
                    name="food-type"
                    title="Loại thực phẩm"
                    register={register}
                  />

                  <CheckboxComponent
                    id="food-provider"
                    labels={[
                      {
                        label: 'Hợp tác xã A',
                        value: 'htxa'
                      },
                      {
                        label: 'Hợp tác xã B',
                        value: 'htxb'
                      },
                      {
                        label: 'Hợp tác xã C',
                        value: 'htxc'
                      }
                    ]}
                    title="Nhà cung cấp"
                    register={register}
                  />

                  <UploadImgComponent
                    id="add-food-img-upload"
                    name="food-img"
                    register={register}
                    watch={watch}
                    title="Ảnh thực phẩm"
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
    </>
  );
};

export default AddFood;
