import { useLocation } from 'react-router-dom';

import { Search } from './Search';

import { ReactPizzaLogo, CartLink } from './reexports';

export const Header: React.FC = () => {
  const { pathname } = useLocation();

  const renderContent = () => {
    if (pathname !== '/cart') {
      return (
        <>
          <Search />
          <CartLink />
        </>
      );
    }
  };

  return (
    <section className="header">
      <div className="container">
        <ReactPizzaLogo />
        {renderContent()}
      </div>
    </section>
  );
};
