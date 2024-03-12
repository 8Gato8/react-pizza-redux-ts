import { memo } from 'react';

import { useAppDispatch } from '../app/hooks';

import { allFiltrationReset } from '../features/filtration/filtrationSlice';

import { Link } from 'react-router-dom';
import logoSvg from '../assets/img/pizza-logo.svg';

export const ReactPizzaLogo: React.FC = memo(() => {
  const dispatch = useAppDispatch();

  return (
    <Link
      onClick={() => {
        dispatch(allFiltrationReset());
      }}
      to="/">
      <div className="header__logo">
        <img width="38" src={logoSvg} alt="Pizza logo" />
        <div>
          <h1>React Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
    </Link>
  );
});
