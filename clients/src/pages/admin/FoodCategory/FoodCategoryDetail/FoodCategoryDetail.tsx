import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, OkCancelModal, TextComponent } from "@/components";
import './FoodCategoryDetail.scss';
import { CategoryDetail, CategoryStatus } from "@/types/Category";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useState } from "react";
import { deleteCategory } from "@/api/categoryApi";
import { overlayStore } from "@/store";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: CategoryDetail | undefined;
  onDelete: () => void;
}

const FoodCategoryDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit, detailData, onDelete } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteCate = async () => {
    const deleteResult = await deleteCategory(detailData?.maDanhMuc ?? '');
    console.log('Delete result:', deleteResult);
    onDelete();
    setShowDeleteModal(false);
    hideOverlay();
    setIsShowDetail(false);
  };
  const { hideOverlay, showOverlay } = overlayStore();
  return (
    <>
      {detailData && (
        <div className="food-category-detail-component">
          <div className="food-category-detail-header">
            <BackComponent
              backTitle="Quay lại danh sách loại thực phẩm"
              onBack={() => { setIsShowDetail(false); }}
            />
          </div>
          <div className="category-tool">
            <TextComponent
              className="food-category-name"
              text={detailData.tenDanhMuc}
              title
            />
            <div className="hide-edit">
              <ButtonComponent
                className="btn-hide"
                label="Xóa danh mục"
                onClick={() => {
                  setShowDeleteModal(true);
                  showOverlay();
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
          </div>
          <div className="food-category-detail-body">
            <AdminContainerComponent
              className="food-category-detail-container"
              title="Thông tin chi tiết"
              children={
                <div className="food-category-detail">
                  <InfoItemComponent title="Mã danh mục" content={`: ${detailData.maDanhMuc}`} />
                  <InfoItemComponent title="Trạng thái" content={`: ${CategoryStatus[detailData.trangThai]}`} />
                  <InfoItemComponent title="Ngày tạo" content={`: ${datetimeFormatter(detailData.ngayTao + '')}`} />
                  <InfoItemComponent title="Ngày cập nhật (gần nhất)" content={`: ${datetimeFormatter(detailData.ngayCapNhat + '')}`} />
                </div>
              }
            />
            <AdminContainerComponent
              className="food-category-description-container"
              title="Mô tả"
              children={
                <TextComponent text={detailData.moTa} color="#000" />
              }
            />
          </div>
        </div>
      )}
      {/* Delete modal */}
      {showDeleteModal && (
        <OkCancelModal
          message={
            <p>Bạn chắc chắn muốn xóa danh mục {' '}
              <span style={{ fontWeight: 700 }}>{detailData?.tenDanhMuc}</span> ?
            </p>
          }
          onOk={() => {
            deleteCate();
          }}
          onCancel={() => {
            hideOverlay();
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default FoodCategoryDetail;
