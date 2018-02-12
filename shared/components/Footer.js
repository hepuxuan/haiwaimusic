import React from 'react';
import styles from './Footer.scss';

export default function () {
  return (
    <div className={`${styles.footer}`}>
      <div className={styles.feeback}>
        <span>联系我们：</span>
        <i className="material-icons">email</i>
        <a href="mailto:puxuanhe@gmail.com">puxuanhe@gmail.com</a>
      </div>
    </div>
  );
}
