import { Filter } from "@/types";
import './AsideBox.scss';

interface IProps {
  title: string;
  type: 'category' | 'checkbox-filter';
  cateData?: { maDanhMuc: string, tenDanhMuc: string; }[];
  filterData?: { labelType: string, filterData: Filter[]; }[];
  setCategoryId?: React.Dispatch<React.SetStateAction<string>>;
  choosingId?: string;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
}

const AsideBox = (props: IProps) => {
  const { title, type, cateData, filterData, setCategoryId, choosingId, setPage, setLimit } = props;
  return (
    <div className="aside-box-component">
      <span className="title">{title}</span>
      {(type === 'category' && cateData) && (
        <div className="category-content">
          {cateData.map((item, index) => (
            <span key={index} style={{ fontWeight: (choosingId === item.maDanhMuc) ? 500 : 400 }} onClick={() => {
              setCategoryId && setCategoryId(item.maDanhMuc.toString());
              setPage && setPage(1);
              setLimit && setLimit(12);
            }}>
              {item.tenDanhMuc.toString()}
            </span>
          ))}
        </div>
      )}

      {type === 'checkbox-filter' && (
        <div className="filter-content">
          {filterData?.map((item, index) => (
            <div className="filter-item" key={index}>
              <span>{item.labelType.toString()}</span>
              <div className="filter-item-contents">
                {Array.isArray(item.filterData) && item.filterData.map((filterItem, index) => (
                  <div className="filter-item-content" key={index}>
                    <input type="checkbox" name={filterItem.value.toString()} id={filterItem.value.toString()} />
                    <label htmlFor={filterItem.value.toString()}>{filterItem.label}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AsideBox;
