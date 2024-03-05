import { memo } from 'react';

import { useAppDispatch } from '../app/hooks';

import { categoryChanged } from '../features/filtration/filtrationSlice';

const categoriesNames = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

interface CategoriesPropsInterface {
  category: number | null;
}

export const Categories: React.FC<CategoriesPropsInterface> = memo(({ category }) => {
  const dispatch = useAppDispatch();

  const onCategoryClick = (categoryId: number | null) => {
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
});
