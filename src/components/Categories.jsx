import { useSelector, useDispatch } from 'react-redux';

import { categoryChanged } from '../features/filtration/filtrationSlice';

const categoriesNames = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Сategories() {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.filtration.category);

  const onCategoryClick = (categoryId) => {
    console.log(category);
    const value = categoryId !== 0 ? categoryId : null;
    dispatch(categoryChanged(value));
  };

  return (
    <article className="categories">
      <ul>
        {categoriesNames.map((categoryName, index) => (
          <li
            className={`${category === index || (!category && index === 0) ? 'active' : ''}`}
            onClick={() => onCategoryClick(index)}
            key={index}>
            {categoryName}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Сategories;
