import '../scss/app.scss';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Cart';

import { SearchValueContext } from '../context/SearchValueContext';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </SearchValueContext.Provider>
      </div>
    </div>
  );
}

export default App;
