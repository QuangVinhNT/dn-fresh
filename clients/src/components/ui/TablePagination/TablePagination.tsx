import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import './TablePagination.scss';

interface IProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const TablePagination = (props: IProps) => {
  const { page, limit, total, setPage, setLimit } = props;
  const totalPage = Math.ceil(total / limit);
  return (
    <div className="table-pagination-component">
      <div className="data-number-container">
        <p>Hiển thị</p>
        <select name="" id="" onChange={(e) => {
          setLimit(parseInt(e.target.value))
          setPage(1)
          }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <p>kết quả</p>
      </div>
      <div className="pagination-container">
        <IoChevronBackOutline
          onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
        />
        {Array.from({ length: totalPage }, (_, idx) => (
          <span
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`${page === idx + 1 && 'active'}`}>
            {idx + 1}
          </span>
        ))}
        <IoChevronForwardOutline
          onClick={() => setPage(page + 1 > totalPage ? totalPage : page + 1)}
        />
      </div>
    </div>
  );
};

export default TablePagination;
