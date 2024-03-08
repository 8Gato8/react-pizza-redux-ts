import { memo } from 'react';

import { useRef, useMemo, useState, ChangeEvent } from 'react';

import { filterChanged } from '../../features/filtration/filtrationSlice';

import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

import searchIcon from '../../assets/img/search-icon.svg';

import clearIcon from '../../assets/img/clear-icon.svg';

import { useAppDispatch } from '../../app/hooks';

export const Search: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [localSearchValue, setLocalSearchValue] = useState('');

  const updateSearchValue = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(filterChanged(str));
      }, 1000),
    [dispatch],
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClearClick = () => {
    dispatch(filterChanged(''));
    setLocalSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <article className={styles.root}>
      <img src={searchIcon} className={styles.searchIcon} alt="search icon" />
      <input
        ref={inputRef}
        value={localSearchValue}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />

      {localSearchValue && (
        <img src={clearIcon} className={styles.clearIcon} onClick={onClearClick} alt="clear icon" />
      )}
    </article>
  );
});
