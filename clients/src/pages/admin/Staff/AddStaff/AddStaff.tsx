import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './AddStaff.scss';

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddStaff = (props: IProps) => {
  const { setIsShowAdd } = props;
  return (
    <div className="add-staff-component">
      <div className="add-staff-header">
        <BackComponent
          backTitle="Quay lại danh sách nhân viên"
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
      <div className="add-staff-body">
        <AdminContainerComponent
          title='Thông tin nhân viên'
          children={
            <>
            </>
          }
        />
      </div>
    </div>
  );
};

export default AddStaff;
