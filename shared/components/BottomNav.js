import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styles from './bottomNav.scss';

function BottomNav({ store, location }) {
  const activeLink = store.path;
  if (!store.showNav) {
    return null;
  }
  return (
    <div className={styles.bottomNavRoot}>
      <div className={styles.bottomNav}>
        <div className={activeLink === '/' ? `${styles.active} ${styles.navLink}` : styles.navLink}>
          <Link to={`/${location.search}`}>主页</Link>
        </div>
        <div
          className={
            activeLink === '/playList' ? `${styles.active} ${styles.navLink}` : styles.navLink
          }
        >
          <Link to={`/playList${location.search}`}>播放列表</Link>
        </div>
        <div
          className={
            activeLink === '/search' ? `${styles.active} ${styles.navLink}` : styles.navLink
          }
        >
          <Link to={`/search${location.search}`}>搜索</Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(inject('store')(observer(BottomNav)));
