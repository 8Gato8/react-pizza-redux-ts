import { useRef, useCallback, useContext, useState } from 'react';

import { SearchValueContext } from '../../context/SearchValueContext';

import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

function Search() {
  const inputRef = useRef(null);

  const { /* searchValue, */ setSearchValue } = useContext(SearchValueContext);

  const [localSearchValue, setLocalSearchValue] = useState('');

  /* Лучше разобраться с debounce по-нормальному и запилить свою функцию */

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  const onChangeInput = (event) => {
    setLocalSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClearClick = () => {
    setSearchValue('');
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
