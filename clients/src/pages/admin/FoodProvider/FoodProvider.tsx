import { getProviderById, getProviders } from "@/api/providerApi";
import { ButtonComponent, FilterComponent, SearchComponent, TablePagination } from "@/components";
import { loadingStore, overlayStore } from "@/store";
import { FilterType } from "@/types";
import { ProviderDetailType, ProviderList, ProviderStatus } from "@/types/Provider";
import { dateFormatter } from "@/utils/datetimeFormatter";
import { useEffect, useRef, useState } from "react";
import { IoAdd, IoFilter } from "react-icons/io5";
import { TfiExport } from "react-icons/tfi";
import AddProvider from "./AddProvider/AddProvider";
import './FoodProvider.scss';
import EditProvider from "./ProviderDetail/EditProvider/EditProvider";
import ProviderDetail from "./ProviderDetail/ProviderDetail";

const headers = ['Mã nhà cung cấp', 'Tên nhà cung cấp', 'Ngày đăng ký', 'Trạng thái hoạt động'];

const FoodProvider = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [providers, setProviders] = useState<ProviderList[]>([]);
  const [provider, setProvider] = useState<ProviderDetailType>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const keywordRef = useRef<string>('');

  const { showLoading, hideLoading } = loadingStore();

  useEffect(() => {
    const statusFilter = filters.find(filter => filter.name === 'status')?.value;
    fetchProviders(statusFilter);
  }, [limit, page, filters]);

  const fetchProviders = async (status?: string) => {
    showLoading();
    try {
      const response = await getProviders(page, limit, keywordRef.current, status);
      setProviders(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error when load product:', error);
    } finally {
      hideLoading();
    }
  };

  const handleClickRow = async (providerId: string) => {
    try {
      const response = await getProviderById(providerId);
      setProvider(response);
      setIsShowDetail(true);
    } catch (error) {
      console.log('Error when get provider:', error);
    }
  };

  return (
    <>
      {(!isShowAdd && !isShowDetail && !isShowEdit) && (
        <div className="provider-component">
          <div className="provider-header">
            <div className="export-file">
              <TfiExport className="icn-download" />
              <span>Xuất file</span>
            </div>
            <ButtonComponent
              className="btn-add"
              type="no-submit"
              label="Thêm nhà cung cấp"
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
                      name: 'Ngưng hoạt động',
                      value: 0,
                    },
                    {
                      name: 'Đang hoạt động',
                      value: 1,
                    },
                    {
                      name: 'Tạm khóa',
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
              <SearchComponent placeholder="Nhập tên nhà cung cấp..." onSearch={fetchProviders} keywordRef={keywordRef} setPage={setPage} />
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
                {providers?.map((provider, idx) => (
                  <tr key={idx} className="tb-body-row" onClick={() => {
                    handleClickRow(provider.maNhaCungCap);
                  }}>
                    <td style={{ padding: '10px 0 10px 20px', textAlign: 'justify' }}>
                      <span>{provider.maNhaCungCap}</span>
                    </td>
                    <td>
                      <span>{provider.tenNhaCungCap}</span>
                    </td>
                    <td>
                      <span>{dateFormatter.format(new Date(provider.ngayDangKy + ""))}</span>
                    </td>
                    <td>
                      <span>{ProviderStatus[provider.trangThaiHoatDong]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
          </div>
        </div>
      )}

      {isShowAdd && <AddProvider setIsShowAdd={setIsShowAdd} onAdded={fetchProviders} />}

      {isShowDetail && <ProviderDetail setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} detailData={provider} onDeleted={fetchProviders} />}

      {isShowEdit && <EditProvider setIsShowDetail={setIsShowDetail} setIsShowEdit={setIsShowEdit} data={provider} onEdited={fetchProviders} />}
    </>
  );
};

export default FoodProvider;
