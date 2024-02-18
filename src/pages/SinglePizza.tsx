import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPizzaById } from '../features/singlePizza/singlePizzaSlice';

function SinglePizza() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { singlePizza, singlePizzaStatus, error } = useSelector((state) => state.singlePizza);
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
    dispatch(fetchPizzaById(id));
  }, [dispatch, id]);

  return <section className="container">{renderContent()}</section>;
}

export default SinglePizza;
