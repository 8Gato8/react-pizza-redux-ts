import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(item) => onPageChange(item.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
