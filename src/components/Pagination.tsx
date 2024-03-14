import { useState, memo } from 'react';

import clsx from 'clsx';

import { PAGE_LIMIT } from '../utils/constants';

import { useAppDispatch } from '../app/hooks';

import { pageChanged } from '../features/filtration/filtrationSlice';

interface PaginationProps {
  page: number;
  pizzasLength: number;
}

export const Pagination: React.FC<PaginationProps> = memo(({ page, pizzasLength }) => {
  const dispatch = useAppDispatch();

  const [chunk, setChunk] = useState([1, 2, 3]);

  const incrementChunkItem = () => {
    setChunk((prev) => prev.map((prevItem) => prevItem + 1));
  };

  const decrementChunkItem = () => {
    setChunk((prev) => prev.map((prevItem) => prevItem - 1));
  };

  const onPageChange = (newPage: number) => {
    dispatch(pageChanged(newPage));

    if (newPage === chunk[2]) {
      incrementChunkItem();
    }

    if (newPage === chunk[0] && newPage !== 1) {
      decrementChunkItem();
    }
  };

  return (
    <article className="pagination">
      <button
        className="pagination__button prev-button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}>
        <span>{'<'}</span>
      </button>

      {chunk.map((chunkPage /* , index */) => (
        <button
          className={clsx(
            'pagination__button',
            chunkPage === page && 'pagination__button--selected',
          )}
          key={chunkPage}
          onClick={() => onPageChange(chunkPage)}
          disabled={(chunkPage - 1) * PAGE_LIMIT >= pizzasLength}>
          <span>{chunkPage}</span>
        </button>
      ))}

      <button
        className="pagination__button next-button"
        onClick={() => onPageChange(page + 1)}
        disabled={page * PAGE_LIMIT >= pizzasLength}>
        <span>{'>'}</span>
      </button>
    </article>
  );
});
