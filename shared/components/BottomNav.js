import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styles from './bottomNav.scss';

function BottomNav({ store }) {
  const activeLink = store.path;
  if (!store.showNav) {
    return null;
  }
  return (
    <div className={styles.bottomNavRoot}>
      <div className={styles.bottomNav}>
        <div className={activeLink === '/' ? `${styles.active} ${styles.navLink}` : styles.navLink}>
          <Link to="/">主页</Link>
        </div>
        <div
          className={
            activeLink === '/playList' ? `${styles.active} ${styles.navLink}` : styles.navLink
          }
        >
          <Link to="/playList">播放列表</Link>
        </div>
        <div
          className={
            activeLink === '/search' ? `${styles.active} ${styles.navLink}` : styles.navLink
          }
        >
          <Link to="/search">搜索</Link>
        </div>
      </div>
    </div>
  );
}

export default inject('store')(observer(BottomNav));
