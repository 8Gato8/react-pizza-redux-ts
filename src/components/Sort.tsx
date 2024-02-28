import { useState /* useEffect, useRef */ } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { sortByChanged, selectFiltration } from '../features/filtration/filtrationSlice';

import { sortingFilters } from '../utils/constants';

import { SortByInterface } from '../features/filtration/filtrationSlice';

import { useOutsideClick } from '../customHooks/useOutsideClick';

function Sort() {
  const dispatch = useAppDispatch();

  const sortRef = useOutsideClick(() => {
    setIsSortingPopupOpen(false);
  });

  const { sortBy, sortRuName, order } = useAppSelector(selectFiltration);

  const [isSortingPopupOpen, setIsSortingPopupOpen] = useState(false);

  const onSortingFilterClick = (sortingType: SortByInterface) => {
    if (sortRuName !== sortingType.sortRuName) {
      dispatch(sortByChanged(sortingType));
    }

    setIsSortingPopupOpen(false);
  };

  return (
    <article ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка</b>
        <b>по:</b>
        <span onClick={() => setIsSortingPopupOpen(!isSortingPopupOpen)}>{sortRuName}</span>
      </div>
      {isSortingPopupOpen && (
        <div className="sort__popup">
          <ul>
            {sortingFilters.map((sortingType, index) => (
              <li
                onClick={() => onSortingFilterClick(sortingType)}
                key={index}
                className={`${
                  sortBy === sortingType.sortBy && order === sortingType.order ? 'active' : ''
                }`}>
                {sortingType.sortRuName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default Sort;
