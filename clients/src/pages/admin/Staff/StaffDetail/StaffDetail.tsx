import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './StaffDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const StaffDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="staff-detail-component">
      <div className="staff-detail-header">
        <BackComponent
          backTitle="Quay lại danh sách nhân viên"
          onBack={() => { setIsShowDetail(false); }}
        />
        <div className="delete-edit">
          <ButtonComponent
            className="btn-delete"
            type="no-submit"
            label="Xóa nhân viên"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-edit"
            type="no-submit"
            label="Sửa nhân viên"
            variant="primary"
            onClick={() => {
              setIsShowEdit(true);
              setIsShowDetail(false);
            }}
          />
        </div>
      </div>
      <div className="staff-detail-body">
        <AdminContainerComponent
          title='Thông tin chung'
          children={
            <>
            </>
          }
        />
        <AdminContainerComponent
          title='Thông tin thêm'
          children={
            <>
            </>
          }
        />
      </div>
    </div>
  );
};

export default StaffDetail;
