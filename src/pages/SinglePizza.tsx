import { Link } from 'react-router-dom';

import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { SkeletonForSinglePizzaPage } from '../components/SkeletonForSinglePizzaPage';

import { ErrorInfo } from '../components/ErrorInfo';

import { fetchPizzaById, selectSinglePizza } from '../features/singlePizza/singlePizzaSlice';

interface SinglePizzaProps {
  resetFilter: () => void;
  resetAllFilters: () => void;
}

export const SinglePizza: React.FC<SinglePizzaProps> = ({ resetFilter, resetAllFilters }) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { singlePizza, singlePizzaStatus, error } = useAppSelector(selectSinglePizza);
  const { title, imageUrl, price, description } = singlePizza;

  const renderSkeleton = () => {
    return (
      <article className="single-pizza">
        <SkeletonForSinglePizzaPage />
      </article>
    );
  };

  const renderPizza = () => {
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
  };

  const renderError = () => {
    return <ErrorInfo error={error} resetFilter={resetFilter} resetAllFilters={resetAllFilters} />;
  };

  const renderContent = () => {
    switch (singlePizzaStatus) {
      case 'loading':
        return renderSkeleton();
      case 'succeeded':
        return renderPizza();
      case 'failed':
        return renderError();
    }
  };

  useEffect(() => {
    dispatch(fetchPizzaById(Number(id)));
  }, [dispatch, id]);

  return <section className="container container--single-pizza">{renderContent()}</section>;
};
