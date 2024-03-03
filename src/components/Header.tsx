import { useLocation } from 'react-router-dom';

import Search from './Search';

import CartLink from './CartLink';
import ReactPizzaLogo from './ReactPizzaLogo';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const renderContent = () => {
    if (pathname !== '/cart') {
      return <CartLink />;
    }
  };

  return (
    <section className="header">
      <div className="container">
        <ReactPizzaLogo />
        <Search />
        <div className="header__cart">{renderContent()}</div>
      </div>
    </section>
  );
};

export default Header;
