import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import './Pagination.scss';

interface IProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const Pagination = (props: IProps) => {
  const { page, limit, total, setPage, setLimit } = props;
  const totalPage = Math.ceil(total / limit);
  return (
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
  );
};

export default Pagination;
