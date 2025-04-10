import { IObject } from "@/types";
import './AsideBox.scss';
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  type: 'category' | 'checkbox-filter';
  cateData?: IObject[];
  filterData?: { labelType: string, filterData: IObject[]; }[];
}

const AsideBox = (props: IProps) => {
  const { title, type, cateData, filterData } = props;
  return (
    <div className="aside-box-component">
      <span className="title">{title}</span>
      {(type === 'category' && cateData) && (
        <div className="category-content">
          {cateData.map((item, index) => (
            <Link to={'/'} key={index}>
              {item.label.toString()}
            </Link>
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
