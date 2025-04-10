import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './EditStaff.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStaff = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="edit-staff-component">
      <div className="edit-staff-header">
        <BackComponent
          backTitle="Quay lại chi tiết nhân viên"
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
      <div className="edit-staff-body">
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

export default EditStaff;
