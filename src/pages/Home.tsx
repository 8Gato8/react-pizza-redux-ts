import { useEffect, useRef } from 'react';
import { useNavigate /* , useLocation */ } from 'react-router-dom';

import qs from 'qs';

import { sortingFilters } from '../utils/constants';

import Categories from '../components/Categories';
import Skeleton from '../components/Pizza/Skeleton';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Pagination from '../components/Pagination';

import { fetchPizzas, selectPizzas } from '../features/pizzas/pizzasSlice';

import { AssignFiltrationInterface } from '../features/filtration/filtrationSlice';

import {
  pageChanged,
  assignFiltrationState,
  selectFiltration,
} from '../features/filtration/filtrationSlice';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { PizzaInterface } from '../types/pizzasTypes';

interface DataInterface {
  sortBy: string;
  page: number;
  limit: number;
  filter?: string;
  category?: null | number;
  order?: string;
}

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /* const { pathname } = useLocation(); */

  /* const isSearchDone = useRef(false); */
  const isMounted = useRef(false);

  const { pizzas, pizzasStatus, error } = useAppSelector(selectPizzas);

  const { page, category, sortBy, order, limit, filter } = useAppSelector(selectFiltration);

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
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortingFilters.find(
        (obj) => obj.sortBy === params.sortBy && obj.order === params.order,
      );

      const newFiltration = {
        ...params,
        ...sort,
      } as AssignFiltrationInterface;

      dispatch(assignFiltrationState(newFiltration));

      /* isSearchDone.current = true; */
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    /* if (!isSearchDone.current) { */
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

    if (isMounted.current) {
      navigate(`?${stringifiedData}`);
    }
    /* } */

    isMounted.current = true;
    /* isSearchDone.current = false; */
  }, [category, sortBy, filter, page, order, navigate, limit, dispatch]);

  return (
    <main className="container">
      <article className="content__top">
        <Categories />
        <Sort />
      </article>
      <h2 className="content__title">Все пиццы</h2>
      {renderContent()}
      <Pagination currentPage={page} onPageChange={onPageChange} />
    </main>
  );
}

export default Home;
