import { useEffect } from 'react';

import qs from 'qs';

import { Categories, Skeleton, Sort, Pizza, Pagination } from '../components/reexports';

import { fetchPizzas, selectPizzas } from '../features/pizzas/pizzasSlice';

import { pageChanged, filterReset, selectFiltration } from '../features/filtration/filtrationSlice';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { PizzaInterface } from '../@types/pizzasTypes';

import { PAGE_LIMIT } from '../utils/constants';

interface HomeProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

interface DataInterface {
  sortBy: string;
  filter?: string;
  category?: null | number;
  order?: string;
}

export const Home: React.FC<HomeProps> = ({ setSearchValue }) => {
  const dispatch = useAppDispatch();

  const { pizzas, pizzasStatus, error } = useAppSelector(selectPizzas);

  const { page, category, sortBy, sortRuName, order, filter } = useAppSelector(selectFiltration);

  const resetFilter = () => {
    dispatch(filterReset());
    setSearchValue('');
  };

  const renderPizzas = (pizzas: Array<PizzaInterface>) => {
    if (pizzas) {
      const pizzasCopy = [...pizzas];
      const indexFromWhichToStart = page * PAGE_LIMIT - PAGE_LIMIT;
      const pizzasToRender = pizzasCopy.splice(indexFromWhichToStart, PAGE_LIMIT);

      return pizzasToRender.map((pizza) => <Pizza key={pizza.id} {...pizza} />);
    }
  };

  const renderSkeletons = () => {
    return [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  };

  const renderContent = () => {
    switch (pizzasStatus) {
      case 'loading':
        return <section className="content__items">{renderSkeletons()}</section>;
      case 'succeeded':
        return <section className="content__items">{renderPizzas(pizzas)}</section>;
      case 'failed':
        return (
          <article className="error-info">
            <h2 className="error-info__title">
              К сожалению, по данному запросу пиццы не найдены 😕
            </h2>
            <p className="error-info__text">Причина: {error}</p>
            <p className="error-info__text">
              Попробуйте ввести другое значение или сбросить фильтр поиска
            </p>
            <button onClick={resetFilter} className="cart--empty button button--black">
              <span>Сбросить поиск</span>
            </button>
          </article>
        );
    }
  };

  useEffect(() => {
    dispatch(pageChanged(1));
  }, [category, sortBy, filter, order, dispatch]);

  useEffect(() => {
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
  }, [category, sortBy, filter, order, dispatch]);

  return (
    <main className="container">
      <article className="content__top">
        <Categories category={category} />
        <Sort sortBy={sortBy} sortRuName={sortRuName} order={order} />
      </article>
      <h2 className="content__title">Все пиццы</h2>
      {renderContent()}
      <Pagination page={page} pizzasLength={pizzas.length} /* onPageChange={onPageChange} */ />
    </main>
  );
};
