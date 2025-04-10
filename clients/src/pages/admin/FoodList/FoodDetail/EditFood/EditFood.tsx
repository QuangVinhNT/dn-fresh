import { AdminContainerComponent, BackComponent, ButtonComponent, CheckboxComponent, InputComponent, SelectComponent, TextComponent, UploadImgComponent } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import './EditFood.scss';

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
}

type QueryData = {
  [key: string]: string;
};

const EditFood = (props: IProps) => {
  const { setIsShowDetail, setIsShowEditFood } = props;
  const { register, handleSubmit, reset, watch } = useForm<QueryData>();

  const onSubmit: SubmitHandler<QueryData> = (data) => {
    console.log(data);
    setIsShowDetail(true);
    setIsShowEditFood(false);
  };

  return (
    <>
      <div className="edit-food-component">
        <BackComponent
          onBack={() => {
            setIsShowDetail(true);
            setIsShowEditFood(false);
          }}
          backTitle="Quay lại chi tiết thực phẩm"
        />
        <TextComponent 
          text='Nước mắm Nam Ngư'
          title
        />
        <form className="edit-food-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="food-image">
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
                  placeholder="SP00001"
                />

                <InputComponent
                  className="food-name"
                  name="food-name"
                  title="Tên sản phẩm"
                  placeholder="Nước mắm Nam Ngư"
                  register={register}
                />

                <InputComponent
                  className="food-quantity"
                  name="food-quantity"
                  title="Số lượng tồn kho"
                  isReadOnly
                  placeholder="10"
                />

                <InputComponent
                  className="food-price"
                  name="food-price"
                  title="Giá bán"
                  placeholder="20000 VND"
                  register={register}
                />

                <InputComponent
                  className="food-unit"
                  name="food-unit"
                  title="Đơn vị tính"
                  placeholder="Chai"
                  register={register}
                />

                <SelectComponent
                  items={selectItems}
                  className="food-type"
                  name="food-type"
                  title="Loại thực phẩm"
                  register={register}
                />

                <SelectComponent
                  className="food-status"
                  title="Trạng thái"
                  name="food-status"
                  items={[
                    {
                      content: 'Đang giao dịch',
                      value: 'trading',
                      isSelected: true,
                    },
                    {
                      content: 'Ngưng giao dịch',
                      value: 'no-trading',
                      isSelected: false,
                    },
                    {
                      content: 'Tạm hết hàng',
                      value: 'out-of-stock',
                      isSelected: false,
                    }
                  ]}
                />

                <CheckboxComponent
                  className="food-provider"
                  title="Nhà cung cấp"
                  register={register}
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
                />

                <InputComponent
                  className="food-desc"
                  name="food-desc"
                  title="Mô tả"
                  placeholder="abcxyz"
                  register={register}
                  isTextarea
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
    </>
  );
};

export default EditFood;
