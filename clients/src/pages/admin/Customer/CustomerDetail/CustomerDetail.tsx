import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './CustomerDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="customer-detail-component">
      <div className="customer-detail-header">
        <BackComponent
          backTitle="Quay lại danh sách khách hàng"
          onBack={() => { setIsShowDetail(false); }}
        />
        <div className="delete-edit">
          <ButtonComponent
            className="btn-delete"
            type="no-submit"
            label="Xóa khách hàng"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-edit"
            type="no-submit"
            label="Sửa khách hàng"
            variant="primary"
            onClick={() => {
              setIsShowEdit(true);
              setIsShowDetail(false);
            }}
          />
        </div>
      </div>
      <div className="customer-detail-body">
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

export default CustomerDetail;
