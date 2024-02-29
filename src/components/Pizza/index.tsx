import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { cartItemAdded, selectCartItemByParams } from '../../features/cart/cartSlice';

import { CartItemInterface } from '../../@types/cartItemTypes';
import { PizzaInterface } from '../../@types/pizzasTypes';

import { Link } from 'react-router-dom';

function Pizza({ id, imageUrl, title, sizes, price, types }: PizzaInterface) {
  const dispatch = useAppDispatch();

  const typeNames = ['тонкое', 'традиционное'];

  const [activeSize, setActiveSize] = useState(0);

  const [activeType, setActiveType] = useState(0);

  const sameItem = useAppSelector((state): CartItemInterface | undefined => {
    return selectCartItemByParams(state.cart, {
      id,
      price,
      type: typeNames[activeType],
      size: sizes[activeSize],
      imageUrl,
      title,
    });
  });

  const count = sameItem?.count || 0;

  const onAddCartItemToCart = () => {
    const cartItem = {
      id,
      imageUrl,
      title,
      price,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };

    dispatch(cartItemAdded(cartItem));
  };

  return (
    <article className="pizza-block">
      <Link to={`/items/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
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
      </div>
      <div className="pizza-block__bottom">
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
          <i>{count}</i>
        </button>
      </div>
    </article>
  );
}

export default Pizza;
