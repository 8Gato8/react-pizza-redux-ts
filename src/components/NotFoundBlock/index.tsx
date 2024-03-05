import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <main className={styles.root}>
      <span>😕</span>
      <h1>Ничего не найдено</h1>
      <p>Пожалуйста, укажите корректный путь в адресной строке</p>
    </main>
  );
};
