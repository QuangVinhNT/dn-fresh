import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent, TextComponent } from "@/components";
import './EditFoodCategory.scss';

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditFoodCategory = (props: IProps) => {
  const { setIsShowEdit, setIsShowDetail } = props;
  return (
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
      <TextComponent title text="Trái cây" />
      <div className="edit-food-category-body">
        <AdminContainerComponent
          title='Thông tin chi tiết'
          extraTitle={
            <>
              <div className="cancel-save">
                <ButtonComponent
                  className="btn-cancel"
                  label="Hủy thay đổi"
                  onClick={() => {
                    // setShowDeleteModal(true);
                    // showOverlay();
                  }}
                  type="no-submit"
                />
                <ButtonComponent
                  className="btn-save"
                  label="Lưu thay đổi"
                  // onClick={() => {
                  //   setIsShowEdit(false);
                  // }}
                  type="no-submit"
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
                placeholder="DM001"
                isReadOnly
              />
              <InputComponent
                name="category-name"
                title="Tên danh mục"
                placeholder="Trái cây"
              />
              <SelectComponent 
                title="Trạng thái"
                name="category-status"
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
            </div>
          }
        />
        <AdminContainerComponent
          title='Mô tả'
          children={
            <>
              <InputComponent 
                name="category-desc"
                isTextarea
                placeholder="This is description."
              />
            </>
          }
        />
      </div>
    </div>
  );
};

export default EditFoodCategory;
