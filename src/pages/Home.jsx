import { useState, useEffect, useContext } from 'react';

import { PAGE_LIMIT, INITIAL_PAGE } from '../utils/constants';

import { SearchValueContext } from '../context/SearchValueContext';

import Categories from '../components/Categories';
import Skeleton from '../components/Pizza/Skeleton';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Pagination from '../components/Pagination';

import { getPizzas } from '../utils/pizzasApi';

/* import { getNewPizzas } from '../features/pizzas/pizzasSlice'; */

import { useSelector /* useDispatch */ } from 'react-redux';

function Home() {
  /* const dispatch = useDispatch(); */
  /* const pizzas = useSelector((state) => state.pizzas); */

  const { searchValue } = useContext(SearchValueContext);

  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  const { activeCategoryId, activeSortingType } = useSelector((state) => state.filtration);

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const renderPizzas = (pizzas) => {
    const pizzasToRender = pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />);
    return pizzasToRender;
  };

  const renderSkeletons = () => {
    return [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(INITIAL_PAGE);
  }, []);

  useEffect(() => {
    const data = {
      sortBy: activeSortingType.sortingType,
      page: currentPage,
      limit: PAGE_LIMIT,
    };

    if (searchValue) {
      data.filter = searchValue;
    }

    if (activeCategoryId) {
      data.category = activeCategoryId;
    }

    if (activeSortingType.order) {
      data.order = activeSortingType.order;
    }
    getNewPizzas(data);
    /* dispatch(getNewPizzas()); */
  }, [activeCategoryId, activeSortingType, searchValue, currentPage /* , dispatch */]);

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
      <Pagination onPageChange={onPageChange} />
    </main>
  );
}

export default Home;
