/* import { useState } from 'react'; */

import { PAGE_LIMIT } from '../utils/constants';

interface PaginationProps {
  page: number;
  pizzasLength: number;
  onPageChange: (newItem: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pizzasLength, onPageChange }) => {
  const chunk = [1, 2, 3];

  /* const [chunk, setChunk] = useState([1, 2, 3]);

  const incrementChunkItem = () => {
    setChunk((prev) => prev.map((prevItem) => prevItem + 1));
  };

  const decrementChunkItem = () => {
    setChunk((prev) => prev.map((prevItem) => prevItem - 1));
  }; */

  return (
    <article className="pagination">
      <button
        className="pagination__button prev-button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}>
        {'<'}
      </button>

      {chunk.map((item, index) => (
        <button
          className="pagination__button"
          key={index}
          onClick={() => onPageChange(item)}
          disabled={(item - 1) * PAGE_LIMIT >= pizzasLength}>
          {item}
        </button>
      ))}

      <button
        className="pagination__button next-button"
        onClick={() => onPageChange(page + 1)}
        disabled={page * PAGE_LIMIT >= pizzasLength}>
        {'>'}
      </button>
    </article>
  );
};
