import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import './TablePagination.scss';

interface IProps {
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const TablePagination = (props: IProps) => {
  const { page, limit, total, setPage, setLimit } = props;
  const totalPage = Math.ceil(total / limit);
  const getPaginationRange = (current: number, total: number) => {
    const delta = 1;
    const range: (number | string)[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    if (left > 2) {
      range.push(1, '...');
    } else {
      for (let i = 1; i < left; i++) {
        range.push(i);
      }
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push('...', total);
    } else {
      for (let i = right + 1; i <= total; i++) {
        range.push(i);
      }
    }

    return range;
  };

  const paginationRange = totalPage === 1 ? [1] : getPaginationRange(page, totalPage);
  return (
    <div className="table-pagination-component">
      <div className="data-number-container">
        <p>Hiển thị</p>
        <select name="" id="" onChange={(e) => {
          setLimit(parseInt(e.target.value));
          setPage(1);
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
        {paginationRange.map((item, idx) =>
          item === '...' ? (
            <span key={idx} className="dots">
              ...
            </span>
          ) : (
            <span
              key={idx}
              onClick={() => setPage(item as number)}
              className={`${page === item ? 'active' : ''}`}>
              {item}
            </span>
          )
        )}
        <IoChevronForwardOutline
          onClick={() => setPage(page + 1 > totalPage ? totalPage : page + 1)}
        />
      </div>
    </div>
  );
};

export default TablePagination;
