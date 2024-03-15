import emptyCartImg from '../assets/img/empty-cart.png';

import clsx from 'clsx';

import { Link } from 'react-router-dom';

import { useState } from 'react';

import { SkeletonForEmptyCart } from './SkeletonForEmptyCart';

export const EmptyCart: React.FC = () => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className="container container--cart">
      {isImgLoaded ? null : <SkeletonForEmptyCart />}

      <section className={clsx('cart', 'cart--empty', !isImgLoaded && 'cart--hidden')}>
        <h2>Корзина пуста 😕</h2>
        <p>
          Вероятней всего, вы ещё не заказывали пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейдите на главную страницу.
        </p>
        <img src={emptyCartImg} onLoad={() => setIsImgLoaded(true)} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </section>
    </div>
  );
};
