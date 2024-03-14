import { /* useEffect, */ useLayoutEffect, useRef } from 'react';

import qs from 'qs';

import {
  Categories,
  SkeletonForPizzaComponent,
  Sort,
  Pizza,
  Pagination,
  ErrorInfo,
} from '../components/reexports';

import { fetchPizzas, selectPizzas } from '../features/pizzas/pizzasSlice';

import { pageChanged, selectFiltration } from '../features/filtration/filtrationSlice';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { PizzaInterface } from '../@types/pizzasTypes';

import { PAGE_LIMIT } from '../utils/constants';

interface HomeProps {
  resetFilter: () => void;
  resetAllFilters: () => void;
}

interface DataInterface {
  sortBy: string;
  filter?: string;
  category?: null | number;
  order?: string;
}

export const Home: React.FC<HomeProps> = ({ resetFilter, resetAllFilters }) => {
  const dispatch = useAppDispatch();

  const isMounted = useRef(false);

  const { pizzas, pizzasStatus, error } = useAppSelector(selectPizzas);

  const { page, category, sortBy, sortRuName, order, filter } = useAppSelector(selectFiltration);

  const renderPizzas = (pizzas: Array<PizzaInterface>) => {
    if (pizzas) {
      const pizzasCopy = [...pizzas];
      const indexFromWhichToStart = page * PAGE_LIMIT - PAGE_LIMIT;
      const pizzasToRender = pizzasCopy.splice(indexFromWhichToStart, PAGE_LIMIT);

      return pizzasToRender.map((pizza) => <Pizza key={pizza.id} {...pizza} />);
    }
  };

  const renderSkeletons = () => {
    return [...new Array(4)].map((_, index) => <SkeletonForPizzaComponent key={index} />);
  };

  const renderError = () => {
    return <ErrorInfo error={error} resetFilter={resetFilter} resetAllFilters={resetAllFilters} />;
  };

  const renderContent = () => {
    switch (pizzasStatus) {
      case 'loading':
        return (
          <>
            <h2 className="content__title">Все пиццы</h2>
            <section className="content__items">{renderSkeletons()}</section>
          </>
        );
      case 'succeeded':
        return (
          <>
            <h2 className="content__title">Все пиццы</h2>
            <section className="content__items">{renderPizzas(pizzas)}</section>
          </>
        );
      case 'failed':
        return renderError();
    }
  };

  useLayoutEffect(() => {
    dispatch(pageChanged(1));
  }, [category, sortBy, filter, order, dispatch]);

  useLayoutEffect(() => {
    if (!localStorage.getItem('pizzas') || isMounted.current) {
      const data: DataInterface = {
        sortBy,
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
    }

    isMounted.current = true;
  }, [category, sortBy, filter, order, dispatch]);

  return (
    <main className="container">
      <article className="content__top">
        <Categories category={category} />
        <Sort sortBy={sortBy} sortRuName={sortRuName} order={order} />
      </article>
      {renderContent()}
      <Pagination page={page} pizzasLength={pizzas.length} />
    </main>
  );
};
