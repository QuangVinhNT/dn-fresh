import { getImportReceiptById, getImportReceipts } from "@/api/importReceiptApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore, overlayStore } from "@/store";
import { FilterType } from "@/types";
import { ImportReceiptDetailType, ImportReceiptList, ImportReceiptStatus } from "@/types/ImportReceipt";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddImportFood from "./AddImportFood/AddImportFood";
import './ImportFood.scss';
import EditImportFood from "./ImportFoodDetail/EditImportFood/EditImportFood";
import ImportFoodDetail from "./ImportFoodDetail/ImportFoodDetail";

const headers = ['Mã phiếu nhập', 'Ngày nhập hàng', 'Mã nhân viên', 'Mã quản trị viên', 'Trạng thái', 'Ngày tạo', 'Ngày cập nhật'];

const ImportFood = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [importReceipts, setImportReceipts] = useState<ImportReceiptList[]>([]);
  const [importReceipt, setImportReceipt] = useState<ImportReceiptDetailType>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();
  const { showOverlay } = overlayStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchImportReceipts(statusFilter);
  }, [limit, page, filters]);

  const fetchImportReceipts = async (status?: string) => {
    showLoading();
    try {
      const response = await getImportReceipts(page, limit, keywordRef.current, status);
      setImportReceipts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = async (importReceiptId: string) => {
    try {
      const response = await getImportReceiptById(importReceiptId);
      setImportReceipt(response);
      setIsShowDetail(true);
    } catch (error) {
      console.log('Error when get receipt:', error);
    }
  };

  return (
    <>
      {(!isShowDetail && !isShowEdit) && (
        <div className="import-food-component">
          <div className="import-food-header">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm phiếu nhập"
              variant="primary"
              affix={<IoAdd className="icn-add" />}
              onClick={() => { 
                setIsShowAdd(true); 
                showOverlay();
              }}
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
              <SearchComponent placeholder="Nhập mã phiếu nhập..." onSearch={fetchImportReceipts} keywordRef={keywordRef} />
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
                {importReceipts?.map((importReceipt, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    handleClickRow(importReceipt.maPhieuNhap);
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{importReceipt.maPhieuNhap}</span>
                    </td>
                    <td>
                      <span>{importReceipt.ngayNhapHang ? datetimeFormatter(importReceipt.ngayNhapHang + "") : <i>Chưa nhập hàng</i>}</span>
                    </td>
                    <td>
                      <span>{importReceipt.maNhanVien || <i>Chưa nhập hàng</i>}</span>
                    </td>
                    <td>
                      <span>{importReceipt.maQuanTriVien}</span>
                    </td>
                    <td>
                      <span>{ImportReceiptStatus[importReceipt.trangThai]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(importReceipt.ngayTao + "")}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(importReceipt.ngayCapNhat + "")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>

          {/* Import food modal */}
          <div className="add-receipt-modal" style={{ top: isShowAdd ? '50%' : '-100%' }}>
            <AddImportFood setIsShowAdd={setIsShowAdd} onAdded={fetchImportReceipts}/>
          </div>
        </div>
      )}

      {isShowDetail && <ImportFoodDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} detailData={importReceipt} onSoftDeleted={fetchImportReceipts}/>}

      {isShowEdit && <EditImportFood setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} data={importReceipt} onEdited={fetchImportReceipts}/>}
    </>
  );
};

export default ImportFood;
