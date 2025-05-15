import { useEffect, useState } from "react";
import './ExportFood.scss';
import { FilterType } from "@/types";
import { TfiExport } from "react-icons/tfi";
import { ButtonComponent, FilterDrawerComponent, TableComponent, TablePagination, TableSearchFilter } from "@/components";
import { IoAdd } from "react-icons/io5";
import ExportFoodDetail from "./ExportFoodDetail/ExportFoodDetail";
import EditExportFood from "./ExportFoodDetail/EditExportFood/EditExportFood";
import AddExportFood from "./AddExportFood/AddExportFood";
import { datetimeFormatter } from "@/utils/datetimeFormatter";
import { ExportReceiptList, ExportReceiptStatus } from "@/types/ExportReceipt";
import { loadingStore } from "@/store";
import { getExportReceipts } from "@/api/exportReceiptApi";

const headers = ['Mã phiếu xuất', 'Ngày xuất hàng', 'Mã nhân viên', 'Mã quản trị viên', 'Trạng thái', 'Ngày tạo', 'Ngày cập nhật'];

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

const ExportFood = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [exportReceipts, setExportReceipts] = useState<ExportReceiptList[]>([])
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    fetchExportReceipts();
  }, [limit, page]);

  const fetchExportReceipts = async () => {
    showLoading();
    try {
      const response = await getExportReceipts(page, limit);
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
            <TableSearchFilter searchPlaceholder="Tìm theo tên sản phẩm" setIsShowFilter={setIsShowFilter} />
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
                      <span>{exportReceipt.id}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(exportReceipt.exportDate)}</span>
                    </td>
                    <td>
                      <span>{exportReceipt.staffId}</span>
                    </td>
                    <td>
                      <span>{exportReceipt.adminId}</span>
                    </td>
                    <td>
                      <span>{ExportReceiptStatus[exportReceipt.status]}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(exportReceipt.createdAt)}</span>
                    </td>
                    <td>
                      <span>{datetimeFormatter(exportReceipt.updatedAt)}</span>
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

      {isShowDetail && <ExportFoodDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowEdit && <EditExportFood setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} />}

      {isShowAdd && <AddExportFood setIsShowAdd={setIsShowAdd}/>}
    </>
  );
};

export default ExportFood;
