import { useContext } from 'react';

import { SearchValueContext } from '../../context/SearchValueContext';

import styles from './Search.module.scss';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

function Search() {
  const { searchValue, onSearchValueChange } = useContext(SearchValueContext);

  return (
    <article className={styles.root}>
      <img src={searchIcon} className={styles.searchIcon} alt="search icon" />
      <input
        value={searchValue}
        onChange={(event) => onSearchValueChange(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />

      {searchValue && (
        <img
          src={clearIcon}
          className={styles.clearIcon}
          onClick={() => onSearchValueChange('')}
          alt="clear icon"
        />
      )}
    </article>
  );
}

export default Search;
