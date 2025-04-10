import { IoClose } from "react-icons/io5";
import './FilterDrawerComponent.scss';
import { FilterType } from "../../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { overlayStore } from "../../../store";

interface IProps {
  filters: FilterType[];
  isShowFilter: boolean;
  setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

type QueryData = {
  [key: string]: string;
};

const FilterDrawerComponent = (props: IProps) => {
  const { filters, isShowFilter, setIsShowFilter } = props;
  const { register, handleSubmit, reset } = useForm<QueryData>();

  const { hideOverlay } = overlayStore();

  const onSubmit: SubmitHandler<QueryData> = (data) => {
    const queryData = Object.keys(data).filter((item) => data[item]);
    setIsShowFilter(!isShowFilter);
    hideOverlay();
    console.log(queryData);
  };
  return (
    <div
      className="filter-drawer"
      style={{
        transform: isShowFilter ? 'translateX(0%)' : 'translateX(100%)',
      }}>
      <div className="filter-header">
        <IoClose
          className="btn-close"
          onClick={() => {
            setIsShowFilter(!isShowFilter);
            hideOverlay();
          }}
        />
        <span>Bộ lọc</span>
      </div>
      <form
        className="filter-body"
        onSubmit={handleSubmit(onSubmit)}
      >
        {filters && filters.map((filter, cateIndex) => (
          <div key={cateIndex} className="filter-container">
            <span className="filter-category">{filter.name}</span>
            <div>
              {filter.values.map((filterValue, detailIndex) => (
                <div key={detailIndex} className="filter-details">
                  <input
                    type="checkbox"
                    id={filterValue.value}
                    {...register(`${filter.query} - ${filterValue.value}`)}
                  />
                  <label htmlFor={filterValue.value}>{filterValue.valueName}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="filter-footer">
          <span className="btn-delete-filter" onClick={() => {
            reset();
          }}>Xóa bộ lọc</span>
          <button className="btn-confirm-filter" onClick={() => {

          }}>Lọc</button>
        </div>
      </form>
    </div>
  );
};

export default FilterDrawerComponent;
