import { AdminContainerComponent, BackComponent, ButtonComponent, InputComponent, SelectComponent } from "@/components";
import './AddFoodCategory.scss';
interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFoodCategory = (props: IProps) => {
  const { setIsShowAdd } = props;
  return (
    <div className="add-food-category-component">
      <div className="add-food-category-header">
        <BackComponent
          backTitle="Quay lại danh sách loại thực phẩm"
          onBack={() => { setIsShowAdd(false); }} />
      </div>
      <div className="add-food-category-body">
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
                name="category-name"
                title="Tên danh mục"
                placeholder="Nhập tên danh mục"
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
              <InputComponent 
                className="category-desc"
                name="category-desc"
                title="Mô tả"
                placeholder="Nhập mô tả danh mục"
                isTextarea
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AddFoodCategory;
