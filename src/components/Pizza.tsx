import { useState, memo } from 'react';

import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { cartItemAdded, selectCartItemByParams } from '../features/cart/cartSlice';

import { SkeletonForPizzaComponent } from './SkeletonForPizzaComponent';

import { PizzaInterface } from '../@types/pizzasTypes';

import { Link } from 'react-router-dom';

export const Pizza: React.FC<PizzaInterface> = memo((props) => {
  const { id, imageUrl, title, sizes, price, types } = props;

  const dispatch = useAppDispatch();

  const typeNames = ['тонкое', 'традиционное'];

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const [activeSize, setActiveSize] = useState(0);

  const [activeType, setActiveType] = useState(0);

  const sameItem = useAppSelector((state) => {
    return selectCartItemByParams(state.cart, {
      ...props,
      type: typeNames[activeType],
      size: sizes[activeSize],
    });
  });

  const countInCart = sameItem?.count || 0;

  const onAddCartItemToCart = () => {
    const cartItem = { ...props, type: typeNames[activeType], size: sizes[activeSize] };

    dispatch(cartItemAdded(cartItem));
  };

  return (
    <>
      {isImgLoaded ? null : <SkeletonForPizzaComponent />}

      <article className={clsx('pizza-block', !isImgLoaded && 'pizza-block--hidden')}>
        <Link to={`/items/pizza/${id}`}>
          <img
            className="pizza-block__image"
            onLoad={() => setIsImgLoaded(true)}
            src={imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <section className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => setActiveType(type)}
                className={`${activeType === index ? 'active' : ''}`}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={`${activeSize === index ? 'active' : ''}`}>
                {size}
              </li>
            ))}
          </ul>
        </section>
        <section className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onAddCartItemToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{countInCart}</i>
          </button>
        </section>
      </article>
    </>
  );
});
