import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent, TextComponent } from "@/components";
import './EditFoodCategory.scss';
import { CategoryDetail, InsertCategoryPayload } from "@/types/Category";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCategory } from "@/api/categoryApi";

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  data: CategoryDetail | undefined;
  onEdited: () => void;
}

type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

const EditFoodCategory = (props: IProps) => {
  const { setIsShowEdit, setIsShowDetail, data, onEdited } = props;
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const payload: InsertCategoryPayload = {
      tenDanhMuc: formData['category-name'].toString(),
      moTa: formData['category-desc'].toString(),
      trangThai: +formData['category-status']
    };
    const updateResult = await updateCategory(data?.maDanhMuc || '', payload);
    console.log(updateResult);
    setIsShowEdit(false);
    setIsShowDetail(false);
    onEdited();
  };
  return (
    <>
      {data && (
        <div className="edit-food-category-component">
          <div className="edit-food-category-header">
            <BackComponent
              backTitle="Quay lại chi tiết loại thực phẩm"
              onBack={() => {
                setIsShowEdit(false);
                setIsShowDetail(true);
              }}
            />
          </div>
          <TextComponent title text={data.tenDanhMuc} />
          <form className="edit-food-category-body" onSubmit={handleSubmit(onSubmit)}>
            <AdminContainerComponent
              title='Thông tin chi tiết'
              extraTitle={
                <>
                  <div className="cancel-save">
                    <ButtonComponent
                      className="btn-cancel"
                      label="Hủy thay đổi"
                      onClick={() => {
                        setIsShowEdit(false);
                      }}
                      type="no-submit"
                    />
                    <ButtonComponent
                      className="btn-save"
                      label="Lưu thay đổi"
                      type="submit"
                      variant="primary"
                    />
                  </div>
                </>
              }
              children={
                <div className="detail-info">
                  <InputComponent
                    name="category-code"
                    title="Mã danh mục"
                    placeholder={data.maDanhMuc}
                    register={register}
                    isReadOnly
                  />
                  <InputComponent
                    name="category-name"
                    title="Tên danh mục"
                    placeholder={data.tenDanhMuc}
                    defaultValue
                    register={register}
                    isRequired
                  />
                  <SelectComponent
                    title="Trạng thái"
                    name="category-status"
                    isRequired
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
                    title="Mô tả"
                    name="category-desc"
                    className="category-desc"
                    placeholder={data.moTa}
                    isTextarea
                    isRequired
                    defaultValue
                    register={register}
                  />
                </div>
              }
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EditFoodCategory;
