import { useRef, useMemo, memo, ChangeEvent } from 'react';

import { filterChanged, filterReset } from '../features/filtration/filtrationSlice';

import debounce from 'lodash.debounce';

import searchIcon from '../assets/img/search-icon.svg';

import clearIcon from '../assets/img/clear-icon.svg';

import { useAppDispatch } from '../app/hooks';

interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = memo(({ searchValue, setSearchValue }) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(filterChanged(str));
      }, 1000),
    [dispatch],
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClearClick = () => {
    dispatch(filterReset());
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <article className="search">
      <img src={searchIcon} className="search__icon" alt="search icon" />
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(event) => onChangeInput(event)}
        className="search__input"
        placeholder="Поиск пиццы..."
      />

      {searchValue && (
        <img
          src={clearIcon}
          className="search__clear-icon"
          onClick={onClearClick}
          alt="clear icon"
        />
      )}
    </article>
  );
});
