import React from 'react';
import styles from './myAccount.scss';

export default function ({ user }) {
  return (
    <div className={styles.myAccount}>
      {
        user ? <a href="/auth/logout">退出</a>
          : <a href="/auth/google">登陆</a>
      }
    </div>
  );
}
