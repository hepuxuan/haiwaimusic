import React from 'react';
import styles from './bottomNav.scss';

export default function ({ activeLink }) {
  return (
    <div className={styles.bottomNav}>
      <div className={styles.inner}>
        <a href="/" className={activeLink === 'home' ? styles.active : ''}>
          <i className="material-icons">home</i>
          主页
        </a>
        <a href="/playList" className={activeLink === 'playList' ? styles.active : ''}>
          <i className="material-icons">list</i>
          播放列表
        </a>
        <a href="/search" className={activeLink === 'search' ? styles.active : ''}>
          <i className="material-icons">search</i>
          搜索
        </a>
      </div>
    </div>
  );
}
