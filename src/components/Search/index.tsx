import { useRef, useCallback, useState } from 'react';

import { filterChanged } from '../../features/filtration/filtrationSlice';

import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';
import { useDispatch } from 'react-redux';

function Search() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [localSearchValue, setLocalSearchValue] = useState('');

  /* Лучше разобраться с debounce по-нормальному и запилить свою функцию */

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(filterChanged(str));
    }, 200),
    [],
  );

  const onChangeInput = (event) => {
    setLocalSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClearClick = () => {
    dispatch(filterChanged(''));
    setLocalSearchValue('');
    inputRef.current.focus();
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
}

export default Search;
