import { memo } from 'react';

import { useAppDispatch } from '../app/hooks';

import { allFiltrationReset } from '../features/filtration/filtrationSlice';

import { Link } from 'react-router-dom';
import logoSvg from '../assets/img/pizza-logo.svg';

interface ReactPizzaLogoProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ReactPizzaLogo: React.FC<ReactPizzaLogoProps> = memo(({ setSearchValue }) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      onClick={() => {
        dispatch(allFiltrationReset());
        setSearchValue('');
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
