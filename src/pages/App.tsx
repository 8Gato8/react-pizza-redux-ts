import '../scss/app.scss';

import { useState, useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectCart } from '../features/cart/cartSlice';
import {
  selectFiltration,
  filterReset,
  allFiltrationReset,
} from '../features/filtration/filtrationSlice';
import { selectPizzas } from '../features/pizzas/pizzasSlice';

import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/Header';

import { Home, NotFound, Cart, SinglePizza } from './reexports';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);
  const filtration = useAppSelector(selectFiltration);
  const pizzas = useAppSelector(selectPizzas);

  const isMounted = useRef(false);

  const [searchValue, setSearchValue] = useState('');

  const resetFilter = () => {
    dispatch(filterReset());
    setSearchValue('');
  };

  const resetAllFilters = () => {
    dispatch(allFiltrationReset());
    setSearchValue('');
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
    <div className="App">
      <div className="wrapper">
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          resetFilter={resetFilter}
          resetAllFilters={resetAllFilters}
        />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Home resetFilter={resetFilter} resetAllFilters={resetAllFilters} />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/items/pizza/:id"
              element={<SinglePizza resetFilter={resetFilter} resetAllFilters={resetAllFilters} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
