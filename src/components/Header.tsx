import { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

import Search from './Search';

import { useAppSelector } from '../app/hooks';

import { selectCart } from '../features/cart/cartSlice';
import { selectFiltration } from '../features/filtration/filtrationSlice';
import { selectPizzas } from '../features/pizzas/pizzasSlice';

import CartLink from './CartLink';
import ReactPizzaLogo from './ReactPizzaLogo';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const cart = useAppSelector(selectCart);
  const filtration = useAppSelector(selectFiltration);
  const pizzas = useAppSelector(selectPizzas);

  const isMounted = useRef(false);

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

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    isMounted.current = true;
  }, [cart]);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('filtration', JSON.stringify(filtration));
    }

    isMounted.current = true;
  }, [filtration]);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('pizzas', JSON.stringify(pizzas));
    }

    isMounted.current = true;
  }, [pizzas]);

  return (
    <section className="header">
      <div className="container">
        <ReactPizzaLogo />
        {renderContent()}
      </div>
    </section>
  );
};

export default Header;
