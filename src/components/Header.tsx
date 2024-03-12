import { useLocation } from 'react-router-dom';

import { Search } from './Search';

import { ReactPizzaLogo, CartLink } from './reexports';

interface HeaderProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ searchValue, setSearchValue }) => {
  const { pathname } = useLocation();

  const renderContent = () => {
    if (pathname !== '/cart') {
      return (
        <>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <CartLink />
        </>
      );
    }
  };

  return (
    <section className="header">
      <div className="container">
        <ReactPizzaLogo setSearchValue={setSearchValue} />
        {renderContent()}
      </div>
    </section>
  );
};
