import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  onPageChange: (newItem: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(item) => onPageChange(item.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
