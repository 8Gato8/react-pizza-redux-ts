import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { sortingFilters } from '../utils/constants';

import Categories from '../components/Categories';
import Skeleton from '../components/Pizza/Skeleton';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Pagination from '../components/Pagination';

import { getPizzas } from '../utils/pizzasApi';
/* import { sortingFilters } from '../utils/constants'; */

/* import { getNewPizzas } from '../features/pizzas/pizzasSlice'; */

import { pageChanged, assignFiltrationState } from '../features/filtration/filtrationSlice';

import { useSelector, useDispatch } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearchDone = useRef(false);
  const isMounted = useRef(false);
  /* const pizzas = useSelector((state) => state.pizzas); */

  const page = useSelector((state) => state.filtration.page);

  const filter = useSelector((state) => state.filtration.filter);

  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  const { category, sortBy, order, limit } = useSelector((state) => state.filtration);
  /* const filtration = useSelector((state) => state.filtration); */

  const renderPizzas = (pizzas) => {
    if (pizzas) {
      const pizzasToRender = pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />);
      return pizzasToRender;
    }
  };

  const renderSkeletons = () => {
    return [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  };

  const onPageChange = (newPage) => {
    dispatch(pageChanged(newPage));
  };

  const getNewPizzas = async (newParams) => {
    try {
      setIsLoading(true);
      const pizzas = await getPizzas(newParams);
      setPizzas(pizzas);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingFilters.find(
        (obj) => obj.sortBy === params.sortBy && obj.order === params.order,
      );

      dispatch(
        assignFiltrationState({
          ...params,
          ...sort,
        }),
      );

      isSearchDone.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isSearchDone.current) {
      const data = {
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
      getNewPizzas(stringifiedData);
      /* getNewPizzas(data); */
      if (isMounted.current) {
        navigate(`?${stringifiedData}`);
      }
      /* dispatch(getNewPizzas()); */
    }

    isMounted.current = true;
    isSearchDone.current = false;
  }, [category, sortBy, filter, page, order, navigate, limit /* , dispatch */]);

  /* useEffect(() => {
    const queryStr = qs.stringify();

  }, []); */

  return (
    <main className="container">
      <article className="content__top">
        <Categories />
        <Sort />
      </article>
      <h2 className="content__title">Все пиццы</h2>
      <section className="content__items">
        {isLoading ? renderSkeletons() : renderPizzas(pizzas)}
        {/* {pizzas.status !== 'suceedeed' ? renderSkeletons() : renderPizzas(pizzas.pizzas)} */}
      </section>
      <Pagination currentPage={page} onPageChange={onPageChange} />
    </main>
  );
}

export default Home;
