import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { fetchPizzaById, selectSinglePizza } from '../features/singlePizza/singlePizzaSlice';

export const SinglePizza: React.FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { singlePizza, singlePizzaStatus, error } = useAppSelector(selectSinglePizza);
  const { title, imageUrl, price } = singlePizza;

  const renderContent = () => {
    switch (singlePizzaStatus) {
      case 'loading':
        return <p>Загрузка...</p>;
      case 'succeeded':
        return (
          <>
            <img src={imageUrl} alt="Pizza" />
            <h2>{title}</h2>
            <p>{price} ₽</p>
          </>
        );
      case 'failed':
        return (
          <section className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>Причина: {error}</p>
          </section>
        );
    }
  };

  useEffect(() => {
    dispatch(fetchPizzaById(Number(id)));
  }, [dispatch, id]);

  return <section className="container">{renderContent()}</section>;
};
