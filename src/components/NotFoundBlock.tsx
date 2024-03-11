import { Link } from 'react-router-dom';

export const NotFoundBlock: React.FC = () => {
  return (
    <main className="not-found-block">
      <span className="not-found-block__sign">😕</span>
      <h1 className="not-found-block__title">Ничего не найдено</h1>
      <p className="not-found-block__text">
        Страницы по указанному адресу на существует. Попробуйте указать другой или вернуться на
        главную страницу.
      </p>
      <Link to="/" className="cart--empty button button--black">
        <span>Вернуться назад</span>
      </Link>
    </main>
  );
};
