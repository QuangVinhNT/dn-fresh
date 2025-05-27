import { FilterType } from "@/types";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import './FilterComponent.scss';

interface IProps {
  filterType: { name: string; value: string; };
  filterItems: { name: string; value: string | number; }[];
  setFilters: React.Dispatch<React.SetStateAction<FilterType[]>>;
}

const FilterComponent = (props: IProps) => {
  const { filterType, filterItems, setFilters } = props;
  const [isActive, setIsActive] = useState<boolean>(false);
  const [chosenItems, setChosenItems] = useState<(string | number)[]>([]);
  return (
    <div className="filter-component">
      <span
        className={`type-filter ${isActive && 'active'}`}
        onClick={() => setIsActive(!isActive)}
      >
        {filterType.name} <IoChevronDownOutline />
      </span>
      {isActive && (
        <div className="filter-container">
          <div className="filter-items">
            {filterItems.map((item, index) => (
              <span
                key={index}
                className={`filter-item ${chosenItems.includes(item.value) ? 'active' : ''}`}
                onClick={() => {
                  if (chosenItems.includes(item.value)) {
                    setChosenItems(chosenItems.filter(value => value !== item.value));
                  } else {
                    setChosenItems([...chosenItems, item.value]);
                  }
                }}
              >
                {item.name}
              </span>
            ))}
          </div>
          <div className="close-apply">
            <span
              className="close"
              onClick={() => {
                setIsActive(false);
              }}
            >
              Đóng
            </span>
            <span
              className="apply"
              onClick={() => {
                setIsActive(false);
                setFilters(prev => {
                  const newFilters = prev.filter(filter => filter.name !== filterType.value);
                  if (chosenItems.length > 0) {
                    newFilters.push({ name: filterType.value, value: chosenItems.join(',') });
                  }
                  return newFilters;
                });
              }}
            >
              Xem kết quả
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
