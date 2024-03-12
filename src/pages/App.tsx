import '../scss/app.scss';

import { useState, useEffect, useRef } from 'react';

import { useAppSelector } from '../app/hooks';

import { selectCart } from '../features/cart/cartSlice';
import { selectFiltration } from '../features/filtration/filtrationSlice';
import { selectPizzas } from '../features/pizzas/pizzasSlice';

import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/Header';

import { Home, NotFound, Cart, SinglePizza } from './reexports';

const App: React.FC = () => {
  const cart = useAppSelector(selectCart);
  const filtration = useAppSelector(selectFiltration);
  const pizzas = useAppSelector(selectPizzas);

  const isMounted = useRef(false);

  const [searchValue, setSearchValue] = useState('');

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
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home setSearchValue={setSearchValue} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/items/pizza/:id" element={<SinglePizza />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
