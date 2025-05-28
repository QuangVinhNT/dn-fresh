import { getExportReceipts } from "@/api/exportReceiptApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { ExportReceiptList, ExportReceiptStatus } from "@/types/ExportReceipt";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddExportFood from "./AddExportFood/AddExportFood";
import './ExportFood.scss';
import EditExportFood from "./ExportFoodDetail/EditExportFood/EditExportFood";
import ExportFoodDetail from "./ExportFoodDetail/ExportFoodDetail";

const headers = ['Mã phiếu xuất', 'Ngày xuất hàng', 'Mã nhân viên', 'Mã quản trị viên', 'Trạng thái', 'Ngày tạo', 'Ngày cập nhật'];

const ExportFood = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [exportReceipts, setExportReceipts] = useState<ExportReceiptList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchExportReceipts(statusFilter);
  }, [limit, page, filters]);

  const fetchExportReceipts = async (status?: string) => {
    showLoading();
    try {
      const response = await getExportReceipts(page, limit, keywordRef.current, status);
      setExportReceipts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };
  return (
    <>
      {(!isShowAdd && !isShowDetail && !isShowEdit) && (
        <div className="export-food-component">
          <div className="export-food-header">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm phiếu xuất"
              variant="primary"
              affix={<IoAdd className="icn-add" />}
              onClick={() => { setIsShowAdd(true); }}
            />
          </div>
          <div className="table-component">
            <div className="filter">
              <h3><IoFilter /> Bộ lọc</h3>
              <div className="filter-list">
                <FilterComponent
                  filterItems={[
                    {
                      name: 'Chưa hoàn thành',
                      value: 0,
                    },
                    {
                      name: 'Đã hoàn thành',
                      value: 1,
                    },
                    {
                      name: 'Đang đợi duyệt',
                      value: 2,
                    },
                    {
                      name: 'Đã hủy',
                      value: 3,
                    }
                  ]}
                  filterType={{
                    name: 'Trạng thái',
                    value: 'status'
                  }}
                  setFilters={setFilters}
                />
              </div>
            </div>
            <div className="search">
              <SearchComponent placeholder="Nhập mã khách hàng..." onSearch={fetchExportReceipts} keywordRef={keywordRef} />
            </div>
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
                {exportReceipts?.map((exportReceipt, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    // handleClickRow(product.id); 
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{exportReceipt.maPhieuXuat}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(exportReceipt.ngayXuatHang + "")}</span>
                    </td>
                    <td>
                      <span>{exportReceipt.maNhanVien}</span>
                    </td>
                    <td>
                      <span>{exportReceipt.maQuanTriVien}</span>
                    </td>
                    <td>
                      <span>{ExportReceiptStatus[exportReceipt.trangThai]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(exportReceipt.ngayTao + "")}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(exportReceipt.ngayCapNhat + "")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>
        </div>
      )}

      {isShowDetail && <ExportFoodDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowEdit && <EditExportFood setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowAdd && <AddExportFood setIsShowAdd={setIsShowAdd} />}
    </>
  );
};

export default ExportFood;
