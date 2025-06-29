import { getExportReceiptById, getExportReceipts } from "@/api/exportReceiptApi";
import { FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { ExportReceiptDetailType, ExportReceiptList, ExportReceiptStatus } from "@/types/ExportReceipt";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import './ISExport.scss';
import ISExportDetail from "./ISExportDetail/ISExportDetail";

const headers = ['Mã phiếu xuất', 'Ngày xuất hàng', 'Mã nhân viên', 'Mã quản trị viên', 'Trạng thái', 'Ngày tạo', 'Ngày cập nhật'];

const ISExport = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [exportReceipts, setExportReceipts] = useState<ExportReceiptList[]>([]);
  const [exportReceipt, setExportReceipt] = useState<ExportReceiptDetailType>();
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

  const handleClickRow = async (importReceiptId: string) => {
    try {
      const response = await getExportReceiptById(importReceiptId);
      setExportReceipt(response);
      setIsShowDetail(true);
    } catch (error) {
      console.log('Error when get receipt:', error);
    }
  };

  return (
    <>
      {(!isShowDetail) && (
        <div className="export-food-component">
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
              <SearchComponent placeholder="Nhập mã phiếu xuất..." onSearch={fetchExportReceipts} keywordRef={keywordRef} setPage={setPage} />
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
                {exportReceipts?.map((receipt, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    handleClickRow(receipt.maPhieuXuat);
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{receipt.maPhieuXuat}</span>
                    </td>
                    <td>
                      <span>{receipt.ngayXuatHang ? datetimeFormatter(receipt.ngayXuatHang + "") : <i>Chưa xuất hàng</i>}</span>
                    </td>
                    <td>
                      <span>{receipt.maNhanVien || <i>Chưa xuất hàng</i>}</span>
                    </td>
                    <td>
                      <span>{receipt.maQuanTriVien}</span>
                    </td>
                    <td>
                      <span>{ExportReceiptStatus[receipt.trangThai]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(receipt.ngayTao + "")}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(receipt.ngayCapNhat + "")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>
        </div>
      )}

      {isShowDetail && <ISExportDetail setIsShowDetail={setIsShowDetail} detailData={exportReceipt} onFinish={fetchExportReceipts} />}
    </>
  );
};

export default ISExport;
