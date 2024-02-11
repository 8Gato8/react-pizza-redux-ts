import { Link, useLocation } from 'react-router-dom';

import logoSvg from '../assets/img/pizza-logo.svg';
import cartIcon from '../assets/img/cart.svg';

import Search from './Search';

import { useSelector } from 'react-redux';

import { selectCart } from '../features/cart/cartSlice';

function Header() {
  const { pathname } = useLocation();
  const { totalCost, totalCount } = useSelector(selectCart);

  const renderContent = () => {
    if (pathname !== '/cart') {
      return (
        <Link to="/cart" className="button button--cart">
          <span>{totalCost} ₽</span>
          <div className="button__delimiter"></div>
          <img src={cartIcon} alt="Cart icon" />
          <span>{totalCount}</span>
        </Link>
      );
    }
  };

  return (
    <section className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>

        <Search />

        <div className="header__cart">{renderContent()}</div>
      </div>
    </section>
  );
}

export default Header;
