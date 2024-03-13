import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { SkeletonForSinglePizzaPage } from '../components/SkeletonForSinglePizzaPage';

import { fetchPizzaById, selectSinglePizza } from '../features/singlePizza/singlePizzaSlice';

export const SinglePizza: React.FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { singlePizza, singlePizzaStatus, error } = useAppSelector(selectSinglePizza);
  const { title, imageUrl, price, description } = singlePizza;

  const renderContent = () => {
    switch (singlePizzaStatus) {
      case 'loading':
        return (
          <article className="single-pizza">
            <SkeletonForSinglePizzaPage />
          </article>
        );
      case 'succeeded':
        return (
          <article className="single-pizza">
            <img className="single-pizza__img" src={imageUrl} alt="Pizza" />
            <h2 className="single-pizza__title">{title}</h2>
            <p className="single-pizza__description">{description}</p>
            <p className="single-pizza__price">{price} ₽</p>
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </article>
        );
      case 'failed':
        return (
          <article className="error-info">
            <h2 className="error-info__title">Произошла ошибка 😕</h2>
            <p className="error-info__text">Причина: {error}</p>
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </article>
        );
    }
  };

  useEffect(() => {
    dispatch(fetchPizzaById(Number(id)));
  }, [dispatch, id]);

  return <section className="container container--single-pizza">{renderContent()}</section>;
};
