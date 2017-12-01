import React from 'react';
import styles from '../scss/nav.scss';

export default function () {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <i className={`material-icons ${styles.backButton}`}>arrow_back</i>
      </a>
      <div />
    </div>
  );
}
