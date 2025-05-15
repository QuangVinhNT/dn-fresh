import { IoFilter, IoSearch } from "react-icons/io5";
import './TableSearchFilter.scss';
import { useRef, useState } from "react";
import { overlayStore } from "@/store";

interface IProps {
  searchPlaceholder?: string;
  setIsShowFilter?: React.Dispatch<React.SetStateAction<boolean>>
}

const TableSearchFilter = (props: IProps) => {
  const {searchPlaceholder, setIsShowFilter} = props
  const [searchKey, setSearchKey] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

  const {showOverlay} = overlayStore();

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(searchKey);
      searchRef.current?.blur();
    }
  };
  return (
    <div className="table-search-filter-component">
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
  );
};

export default TableSearchFilter;
