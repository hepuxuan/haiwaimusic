import React from 'react';
import styles from '../scss/nav.scss';

export default function () {
  return (
    <div className={styles.navbar}>
      <div>
        <a href="/">
          <i className="material-icons">keyboard_arrow_left</i>
        </a>
      </div>
      <div className={styles.pagetitle}>播放列表</div>
      <div />
    </div>
  );
}
