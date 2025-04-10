import { AdminContainerComponent, BackComponent, ButtonComponent, TableComponent } from "@/components";
import './ImportFoodDetail.scss';

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const headers = ['Sản phẩm', 'Ảnh', 'Loại', 'Nhãn hiệu', 'Có thể bán', 'Tồn kho', 'Ngày khởi tạo'];
const data = [
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  },
  {
    name: 'Nước mắm Nam Ngư mới',
    image: 'https://product.hstatic.net/1000141988/product/nuoc_mam_nam_ngu_500_ml_598924383d4f44cab9b0d22b7d9fc80e.jpg',
    type: 'Gia vị',
    brand: 'Nam Ngư',
    sellable: 48,
    warehouse: 48,
    createDate: '07/09/2021'
  }
];

const ImportFoodDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit } = props;
  return (
    <div className="import-food-detail-component">
      <div className="import-food-detail-header">
        <BackComponent
          backTitle="Quay lại danh sách phiếu nhập"
          onBack={() => { setIsShowDetail(false); }}
        />
        <div className="delete-edit">
          <ButtonComponent
            className="btn-delete"
            type="no-submit"
            label="Xóa phiếu nhập"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-edit"
            type="no-submit"
            label="Sửa phiếu nhập"
            variant="primary"
            onClick={() => { 
              setIsShowEdit(true) 
              setIsShowDetail(false)
            }}
          />
        </div>
      </div>
      <div className="import-food-detail-body">
        <div className="provider-import-receipt">
          <AdminContainerComponent
            title='Thông tin nhà cung cấp'
            className="provider"
            children={
              <>
              </>
            }
          />
          <AdminContainerComponent
            title='Thông tin phiếu nhập'
            className="import-receipt"
            children={
              <>
              </>
            }
          />
        </div>
        <AdminContainerComponent
          title='Thông tin thực phẩm nhập'
          children={
            <TableComponent headers={headers} data={data} />
          }
        />
      </div>
    </div>
  );
};

export default ImportFoodDetail;
