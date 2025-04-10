import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './AddImportFood.scss';

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddImportFood = (props: IProps) => {
  const { setIsShowAdd } = props;
  return (
    <div className="add-import-food-component">
      <div className="add-import-food-header">
        <BackComponent
          backTitle="Quay lại danh sách phiếu nhập"
          onBack={() => { setIsShowAdd(false); }}
        />
        <div className="cancel-save">
          <ButtonComponent
            className="btn-cancel"
            type="no-submit"
            label="Hủy"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-save"
            type="no-submit"
            label="Lưu"
            variant="primary"
            onClick={() => { }}
          />
        </div>
      </div>
      <div className="add-import-food-body">
        <AdminContainerComponent
          title='Thông tin phiếu nhập'
          className="import-receipt"
          children={
            <>
            </>
          }
        />
        <AdminContainerComponent
          title='Ghi chú'
          className="note"
          children={
            <>
            </>
          }
        />
      </div>
    </div>
  );
};

export default AddImportFood;
