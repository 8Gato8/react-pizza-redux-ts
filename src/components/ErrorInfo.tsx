import { ErrorInterface } from '../features/pizzas/pizzasSlice';
import { Link } from 'react-router-dom';

interface ErrorInfoProps {
  error: ErrorInterface;
  resetFilter: () => void;
  resetAllFilters: () => void;
}

export const ErrorInfo: React.FC<ErrorInfoProps> = ({ error, resetFilter, resetAllFilters }) => {
  let title: string;
  let messageText: string;
  let button: JSX.Element;

  if (error.status === 404) {
    title = 'К сожалению, по данному запросу пиццы не найдены 😕';
    messageText = 'Попробуйте ввести другое значение или сбросить фильтр поиска';
    button = (
      <button onClick={resetFilter} className="button button--black">
        <span>Сбросить фильтр поиска</span>
      </button>
    );
  } else if (error.status === 429) {
    title = 'Превышено количество запросов к серверу';
    messageText = 'Подождите несколько секунд и попробуйте снова';
    button = (
      <Link onClick={resetAllFilters} to="/" reloadDocument className="button button--black">
        <span>Попробовать снова</span>
      </Link>
    );
  } else {
    title = 'Произошла неизвестная ошибка';
    messageText = `Причина: ${error.message}`;
    button = (
      <Link onClick={resetAllFilters} to="/" reloadDocument className="button button--black">
        <span>Вернуться на главную</span>
      </Link>
    );
  }

  return (
    <article className="error-info">
      <h2 className="error-info__title">{title}</h2>
      <p className="error-info__message">{messageText}</p>
      {button}
    </article>
  );
};
