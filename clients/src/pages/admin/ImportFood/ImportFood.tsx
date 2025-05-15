import { getImportReceipts } from "@/api/importReceiptApi";
import { ButtonComponent, FilterDrawerComponent, TablePagination, TableSearchFilter } from "@/components";
import { loadingStore } from "@/store";
import { FilterType } from "@/types";
import { ImportReceiptList, ImportReceiptStatus } from "@/types/ImportReceipt";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddImportFood from "./AddImportFood/AddImportFood";
import './ImportFood.scss';
import EditImportFood from "./ImportFoodDetail/EditImportFood/EditImportFood";
import ImportFoodDetail from "./ImportFoodDetail/ImportFoodDetail";

const headers = ['Mã phiếu nhập', 'Ngày nhập hàng', 'Mã nhân viên', 'Mã quản trị viên', 'Trạng thái', 'Ngày tạo', 'Ngày cập nhật'];

const filtersData: FilterType[] = [
  {
    query: 'status',
    name: 'Trạng thái',
    values: [
      {
        valueName: 'Đang giao dịch',
        value: 'trading'
      },
      {
        valueName: 'Ngừng giao dịch',
        value: 'notTrading'
      }
    ]
  },
  {
    query: 'productType',
    name: 'Phân loại',
    values: [
      {
        valueName: 'Sản phẩm thường',
        value: 'normal'
      },
      {
        valueName: 'Serial',
        value: 'serial'
      },
      {
        valueName: 'Lô - Hạn sử dụng',
        value: 'expireDate'
      },
      {
        valueName: 'Combo',
        value: 'combo'
      }
    ]
  }
];

const ImportFood = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [importReceipts, setImportReceipts] = useState<ImportReceiptList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchImportReceipts();
  }, [limit, page]);

  const fetchImportReceipts = async () => {
    showLoading();
    try {
      const response = await getImportReceipts(page, limit);
      setImportReceipts(response.data);
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
              onClick={() => { setIsShowAdd(true); }}
            />
          </div>
          <div className="table-component">
            <TableSearchFilter searchPlaceholder="Tìm theo mã phiếu nhập, mã người dùng" setIsShowFilter={setIsShowFilter} />
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
                    // handleClickRow(product.id); 
                    }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{importReceipt.id}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(importReceipt.importDate)}</span>
                    </td>
                    <td>
                      <span>{importReceipt.staffId}</span>
                    </td>
                    <td>
                      <span>{importReceipt.adminId}</span>
                    </td>
                    <td>
                      <span>{ImportReceiptStatus[importReceipt.status]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(importReceipt.createdAt)}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(importReceipt.updatedAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total}/>
            <FilterDrawerComponent filters={filtersData} isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter} />
          </div>
        </div>
      )}

      {isShowDetail && <ImportFoodDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowAdd && <AddImportFood setIsShowAdd={setIsShowAdd} />}

      {isShowEdit && <EditImportFood setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}
    </>
  );
};

export default ImportFood;
