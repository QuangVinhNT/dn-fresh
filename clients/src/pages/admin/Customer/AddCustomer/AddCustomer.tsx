import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './AddCustomer.scss';

interface IProps {
  setIsShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCustomer = (props: IProps) => {
  const { setIsShowAdd } = props;
  return (
    <div className="add-customer-component">
      <div className="add-customer-header">
        <BackComponent
          backTitle="Quay lại danh sách khách hàng"
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
      <div className="add-customer-body">
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

export default AddCustomer;
