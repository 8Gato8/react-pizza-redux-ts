import { memo } from 'react';

import { useLocation } from 'react-router-dom';

import { Search } from './Search';

import { ReactPizzaLogo, CartLink } from './reexports';

interface HeaderProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  resetFilter: () => void;
  resetAllFilters: () => void;
}

export const Header: React.FC<HeaderProps> = memo(
  ({ searchValue, setSearchValue, resetFilter, resetAllFilters }) => {
    const { pathname } = useLocation();

    const renderContent = () => {
      if (pathname !== '/cart') {
        return (
          <>
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              resetFilter={resetFilter}
            />
            <CartLink />
          </>
        );
      }
    };

    return (
      <section className="header">
        <div className="container">
          <ReactPizzaLogo resetAllFilters={resetAllFilters} />
          {renderContent()}
        </div>
      </section>
    );
  },
);
