import { memo } from 'react';

import { Link } from 'react-router-dom';
import logoSvg from '../assets/img/pizza-logo.svg';

interface ReactPizzaLogoProps {
  resetAllFilters: () => void;
}

export const ReactPizzaLogo: React.FC<ReactPizzaLogoProps> = memo(({ resetAllFilters }) => {
  return (
    <Link onClick={resetAllFilters} to="/" reloadDocument>
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
