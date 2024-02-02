import React from 'react';

import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <main className={styles.root}>
      <span>😕</span>
      <h1>Ничего не найдено</h1>
      <p>Пожалуйста, укажите корректный путь в адресной строке</p>
    </main>
  );
}

export default NotFoundBlock;
