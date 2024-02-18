import '../scss/app.scss';

import { Routes, Route } from 'react-router-dom';

import Header from './Header';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Cart';
import SinglePizza from '../pages/SinglePizza';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/items/pizza/:id" element={<SinglePizza />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
