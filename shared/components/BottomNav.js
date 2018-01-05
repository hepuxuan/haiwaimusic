import React from 'react';
import { Link } from 'react-router-dom';
import styles from './bottomNav.scss';

export default function ({ activeLink }) {
  return (
    <div className={styles.bottomNavRoot}>
      <div className={styles.bottomNav}>
        <Link to="/" className={activeLink === 'home' ? styles.active : ''}>
          主页
        </Link>
        <Link to="/playList" className={activeLink === 'playList' ? styles.active : ''}>
          播放列表
        </Link>
        <Link to="/search" className={activeLink === 'search' ? styles.active : ''}>
          搜索
        </Link>
      </div>
    </div>
  );
}
