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
        <Link to="/" className={activeLink === '/' ? styles.active : ''}>
          主页
        </Link>
        <Link to="/playList" className={activeLink === '/playList' ? styles.active : ''}>
          播放列表
        </Link>
        <Link to="/search" className={activeLink === '/search' ? styles.active : ''}>
          搜索
        </Link>
      </div>
    </div>
  );
}

export default inject('store')(observer(BottomNav));
