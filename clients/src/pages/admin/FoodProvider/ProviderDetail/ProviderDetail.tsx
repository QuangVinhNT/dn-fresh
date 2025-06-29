import { ProviderDetailType, ProviderStatus } from "@/types/Provider";
import './ProviderDetail.scss';
import { AdminContainerComponent, BackComponent, ButtonComponent, InfoItemComponent, OkCancelModal, TextComponent } from "@/components";
import { dateFormatter, datetimeFormatter } from "@/utils/datetimeFormatter";
import { overlayStore } from "@/store";
import { useState } from "react";
import { deleteProvider } from "@/api/providerApi";
import { toast } from "react-toastify";

interface IProps {
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: ProviderDetailType | undefined;
  onDeleted: () => void;
}

const headers = ['Mã thực phẩm', 'Tên thực phẩm', 'Số lượng'];

const ProviderDetail = (props: IProps) => {
  const { setIsShowDetail, setIsShowEdit, detailData, onDeleted } = props;

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const { showOverlay, hideOverlay } = overlayStore();

  return (
    <>
      {detailData && (
        <div className="provider-detail-component">
          <BackComponent onBack={() => {
            setIsShowDetail(false);
            window.location.reload();
          }} backTitle="Quay lại danh sách nhà cung cấp" />
          <TextComponent
            text={detailData.tenNhaCungCap ?? "Chưa có dữ liệu"}
            title
          />
          <div className="body">
            <div className="general-info">
              <AdminContainerComponent
                title='Thông tin nhà cung cấp'
                extraTitle={
                  <div className="download-delete-edit">
                    <a
                      href={detailData.giayToPhapLy} className="btn-download"
                      target="_blank"
                      download
                    >
                      Xem giấy tờ
                    </a>
                    <ButtonComponent
                      className="btn-delete"
                      label="Xóa nhà cung cấp"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        showOverlay();
                      }}
                      variant="danger"
                      type="no-submit"
                    />
                    <ButtonComponent
                      className="btn-edit"
                      label="Sửa nhà cung cấp"
                      onClick={() => {
                        setIsShowEdit(true);
                        setIsShowDetail(false);
                      }}
                      type="no-submit"
                      variant="primary"
                    />
                  </div>
                }
                children={
                  <div className="provider-info">
                    <InfoItemComponent
                      title="Mã nhà cung cấp:"
                      content={detailData.maNhaCungCap}
                    />
                    <InfoItemComponent
                      title="Tên nhà cung cấp:"
                      content={detailData.tenNhaCungCap}
                    />
                    <InfoItemComponent
                      title="Địa chỉ:"
                      content={detailData.diaChi}
                    />
                    <InfoItemComponent
                      title="Ngày thành lập:"
                      content={dateFormatter.format(new Date(detailData.ngayThanhLap))}
                    />
                    <InfoItemComponent
                      title="Ngày đăng ký:"
                      content={datetimeFormatter(detailData.ngayDangKy + '')}
                    />
                    <InfoItemComponent
                      title="Ngày cập nhật:"
                      content={datetimeFormatter(detailData.ngayCapNhat + '')}
                    />
                    <InfoItemComponent
                      title="Trạng thái hoạt động:"
                      content={ProviderStatus[detailData.trangThaiHoatDong]}
                    />
                    <InfoItemComponent
                      title="Danh mục cung cấp:"
                      content={detailData.danhMucCungCap}
                    />
                  </div>
                }
              />

              <AdminContainerComponent
                title='Mô tả'
                children={
                  <p>{detailData.moTa}</p>
                }
              />
            </div>
            <div className="provider-products">
              <span className="provider-products-header">Danh sách thực phẩm cung cấp</span>
              <table className="table">
                <thead>
                  <tr className="tb-header-row">
                    {headers.map((value, index) => (
                      <th key={index} className="table-data">
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detailData.thucPhamCungCap?.map((product, idx) => (
                    <tr key={idx} className="tb-body-row">
                      <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                        <span>{product.maThucPham}</span>
                      </td>
                      <td>
                        <span>{product.tenThucPham}</span>
                      </td>
                      <td>
                        <span>{product.soLuong}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="ok-cancel-delete-modal" style={{ top: isShowDeleteModal ? '50%' : '-100%' }}>
            <OkCancelModal
              data={{
                message: <p>Bạn chắc chắn muốn xóa nhà cung cấp này chứ?</p>
              }}
              onOk={async () => {
                try {
                  const deleteResult = await deleteProvider(detailData.maNhaCungCap);
                  console.log(deleteResult);
                  setIsShowDeleteModal(false);
                  onDeleted();
                  hideOverlay();
                  setIsShowDetail(false);
                  toast.success('Xóa nhà cung cấp thành công!');
                } catch (error) {
                  toast.error(`Lỗi: ${error}`);
                }
              }}
              onCancel={() => {
                setIsShowDeleteModal(false);
                hideOverlay();
              }}
              onClose={() => {
                setIsShowDeleteModal(false);
                hideOverlay();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProviderDetail;
