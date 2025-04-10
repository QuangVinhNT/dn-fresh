import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './EditCustomer.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCustomer = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="edit-customer-component">
      <div className="edit-customer-header">
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
      <div className="edit-customer-body">
        <AdminContainerComponent
          title='Thông tin khách hàng'
          children={
            <>
            </>
          }
        />
      </div>
    </div>
  );
};

export default EditCustomer;
