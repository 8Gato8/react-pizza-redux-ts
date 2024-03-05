import { useEffect } from 'react';

import qs from 'qs';

import { Categories, Skeleton, Sort, Pizza, Pagination } from '../components/reexports';

import { fetchPizzas, selectPizzas } from '../features/pizzas/pizzasSlice';

import { pageChanged, selectFiltration } from '../features/filtration/filtrationSlice';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { PizzaInterface } from '../@types/pizzasTypes';

interface DataInterface {
  sortBy: string;
  page: number;
  limit: number;
  filter?: string;
  category?: null | number;
  order?: string;
}

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { pizzas, pizzasStatus, error } = useAppSelector(selectPizzas);

  const { page, category, sortBy, sortRuName, order, limit, filter } =
    useAppSelector(selectFiltration);

  const renderPizzas = (pizzas: Array<PizzaInterface>) => {
    if (pizzas) {
      const pizzasToRender = pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />);
      return pizzasToRender;
    }
  };

  const renderSkeletons = () => {
    return [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  };

  const onPageChange = (newPage: number) => {
    dispatch(pageChanged(newPage));
  };

  const renderContent = () => {
    switch (pizzasStatus) {
      case 'loading':
        return <section className="content__items">{renderSkeletons()}</section>;
      case 'succeeded':
        return <section className="content__items">{renderPizzas(pizzas)}</section>;
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data: DataInterface = {
      sortBy,
      page,
      limit,
    };

    if (filter) {
      data.filter = filter;
    }

    if (category) {
      data.category = category;
    }

    if (order) {
      data.order = order;
    }

    const stringifiedData = qs.stringify(data);

    dispatch(fetchPizzas(stringifiedData));
  }, [category, sortBy, filter, page, order, limit, dispatch]);

  return (
    <main className="container">
      <article className="content__top">
        <Categories category={category} />
        <Sort sortBy={sortBy} sortRuName={sortRuName} order={order} />
      </article>
      <h2 className="content__title">Все пиццы</h2>
      {renderContent()}
      <Pagination currentPage={page} onPageChange={onPageChange} />
    </main>
  );
};
