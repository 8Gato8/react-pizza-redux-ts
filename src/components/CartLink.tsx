import { memo } from 'react';

import { Link } from 'react-router-dom';
import cartIcon from '../assets/img/cart.svg';

import { useAppSelector } from '../app/hooks';
import { selectCart } from '../features/cart/cartSlice';

const CartLink: React.FC = memo(() => {
  const { totalCost, totalCount } = useAppSelector(selectCart);

  return (
    <div className="header__cart">
      <Link to="/cart" className="button button--cart">
        <span>{totalCost} ₽</span>
        <div className="button__delimiter"></div>
        <img src={cartIcon} alt="Cart icon" />
        <span>{totalCount}</span>
      </Link>
    </div>
  );
});

export default CartLink;
