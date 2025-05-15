import { KeyboardEvent, ReactNode, useRef, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, IoFilter, IoSearch } from "react-icons/io5";
import isImage from "../../../utils/isImage";
import './TableComponent.scss';
import { overlayStore } from "../../../store";

interface DataType {
  [key: string]: string | number | ReactNode | string[];
}

interface Props {
  headers: string[];
  data: DataType[];
  searchPlaceholder?: string;
  setIsShowFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableComponent = (props: Props) => {
  const { headers, data, searchPlaceholder, setIsShowFilter, setIsShowDetail } = props;

  const [searchKey, setSearchKey] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

  const { showOverlay } = overlayStore();

  const onEnterPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log(searchKey);
      searchRef.current?.blur();
    }
  };

  return (
    <div className="table-component-container">
      {/* Search and Filter */}
      {(searchPlaceholder || setIsShowFilter) && (
        <div className="search-filter">
          {searchPlaceholder && (
            <div className="input-container">
              <IoSearch />
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyDown={onEnterPress}
              />
            </div>
          )}
          {setIsShowFilter && (
            <button className="btn-filter" onClick={() => {
              setIsShowFilter(true);
              showOverlay();
            }}>
              Bộ lọc
              <IoFilter />
            </button>
          )}
        </div>
      )}

      {/* Table */}
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
          {data.map((value, index) => (
            <tr key={index} className="tb-body-row" onClick={() => setIsShowDetail && setIsShowDetail(true)}>
              {Object.keys(value).map((item, index) => (
                <td key={index} className="table-data">
                  {(typeof value[item] === 'string' && isImage(value[item][0])) ? (
                    <img src={value[item][0]} className="image-data" />
                  ) : (
                    <span>{value[item]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="tb-footer-container">
        <div className="data-number-container">
          <p>Hiển thị</p>
          <select name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <p>kết quả</p>
        </div>
        <div className="pagination-container">
          <IoChevronBackOutline />
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <IoChevronForwardOutline />
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
