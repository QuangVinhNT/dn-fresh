import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, TextComponent } from "@/components";
import './FoodCategoryDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const FoodCategoryDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="food-category-detail-component">
      <div className="food-category-detail-header">
        <BackComponent
          backTitle="Quay lại danh sách loại thực phẩm"
          onBack={() => { setIsShowDetail(false); }}
        />
      </div>
      <TextComponent
        className="food-category-name"
        text="Trái cây"
        title
      />
      <div className="food-category-detail-body">
        <AdminContainerComponent
          className="food-category-detail-container"
          title="Thông tin chi tiết"
          extraTitle={
            <>
              <div className="hide-edit">
                <ButtonComponent
                  className="btn-hide"
                  label="Xóa danh mục"
                  onClick={() => {
                    // setShowDeleteModal(true);
                    // showOverlay();
                  }}
                  type="no-submit"
                />
                <ButtonComponent
                  className="btn-edit"
                  label="Sửa danh mục"
                  onClick={() => {
                    setIsShowEdit(true);
                    setIsShowDetail(false);
                  }}
                  type="no-submit"
                  variant="primary"
                />
              </div>
            </>
          }
          children={
            <div className="food-category-detail">
              <InfoItemComponent title="Mã danh mục" content=":---" />
              <InfoItemComponent title="Tên danh mục" content=":---" />
              <InfoItemComponent title="Ngày tạo" content=":---" />
              <InfoItemComponent title="Ngày cập nhật (gần nhất)" content=":---" />
              <InfoItemComponent title="Trạng thái" content=":---" />
              <InfoItemComponent title="Số lượng thực phẩm" content=":---" />
            </div>
          }
        />
        <AdminContainerComponent
          className="food-category-description-container"
          title="Mô tả"
          children={
            <TextComponent text="This is description." color="#000" />
          }
        />
      </div>
    </div>
  );
};

export default FoodCategoryDetail;
