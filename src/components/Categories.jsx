import { useSelector, useDispatch } from 'react-redux';

import { activeCategoryIdChanged } from '../features/filtration/filtrationSlice';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Сategories() {
  const dispatch = useDispatch();

  const activeCategoryId = useSelector((state) => state.filtration.activeCategoryId);

  const onCategoryClick = (categoryId) => {
    dispatch(activeCategoryIdChanged(categoryId));
  };

  return (
    <article className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={`${activeCategoryId === index ? 'active' : ''}`}
            onClick={() => onCategoryClick(index)}
            key={index}>
            {category}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Сategories;
