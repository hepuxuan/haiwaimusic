import React from 'react';
import styles from './navbar.scss';

export default function ({ title }) {
  return (
    <div className={styles.navbar}>
      <div>
        <a href="/">
          <i className="material-icons">keyboard_arrow_left</i>
        </a>
      </div>
      <div className={styles.pagetitle}>{title}</div>
      <div />
    </div>
  );
}
