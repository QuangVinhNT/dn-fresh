import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './EditExportFood.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditExportFood = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="edit-export-food-component">
      <div className="edit-export-food-header">
        <BackComponent
          backTitle="Quay lại chi tiết phiếu nhập"
          onBack={() => {
            setIsShowDetail(true);
            setIsShowEdit(false);
          }}
        />
        <div className="cancel-save">
          <ButtonComponent
            className="btn-cancel"
            type="no-submit"
            label="Hủy thay đổi"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-save"
            type="no-submit"
            label="Lưu thay đổi"
            variant="primary"
            onClick={() => { }}
          />
        </div>
      </div>
      <div className="edit-export-food-body">
        <AdminContainerComponent
          title='Thông tin phiếu xuất'
          children={
            <>
            </>
          }
        />
      </div>
    </div>
  );
};

export default EditExportFood;
