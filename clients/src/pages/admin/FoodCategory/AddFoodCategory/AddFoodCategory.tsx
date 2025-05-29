import { insertCategory } from "@/api/categoryApi";
import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent } from "@/components";
import { InsertCategoryPayload } from "@/types/Category";
import { SubmitHandler, useForm } from "react-hook-form";
import './AddFoodCategory.scss';

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => void;
}

const AddFoodCategory = (props: IProps) => {
  const { setIsShowAdd, onAdded } = props;
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: InsertCategoryPayload = {
      tenDanhMuc: data['category-name'].toString(),
      moTa: data['category-desc'].toString(),
      trangThai: +data['category-status']
    };
    const insertResult = await insertCategory(payload);
    console.log(insertResult);
    setIsShowAdd(false);
    onAdded();
  };

  return (
    <div className="add-food-category-component">
      <div className="add-food-category-header">
        <BackComponent
          backTitle="Quay lại danh sách loại thực phẩm"
          onBack={() => { setIsShowAdd(false); }} />
      </div>
      <form className="add-food-category-body" onSubmit={handleSubmit(onSubmit)}>
        <AdminContainerComponent
          title='Thông tin chi tiết'
          extraTitle={
            <>
              <div className="cancel-save">
                <ButtonComponent
                  className="btn-cancel"
                  label="Hủy"
                  onClick={() => {
                    setIsShowAdd(false)
                  }}
                  type="no-submit"
                />
                <ButtonComponent
                  className="btn-save"
                  label="Lưu"
                  type="submit"
                  variant="primary"
                />
              </div>
            </>
          }
          children={
            <div className="detail-info">
              <InputComponent
                name="category-name"
                title="Tên danh mục"
                placeholder="Nhập tên danh mục"
                register={register}
              />
              <SelectComponent
                title="Trạng thái"
                name="category-status"
                register={register}
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
                  }
                ]}
              />
              <InputComponent
                className="category-desc"
                name="category-desc"
                title="Mô tả"
                placeholder="Nhập mô tả danh mục"
                isTextarea
                register={register}
              />
            </div>
          }
        />
      </form>
    </div>
  );
};

export default AddFoodCategory;
