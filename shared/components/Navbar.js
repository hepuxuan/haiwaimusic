import React from 'react';
import MyAccount from './myAccount';
import styles from './navbar.scss';

export default function ({ title, user }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navInner}>
        <div>
          <a href="/">
            <i className="material-icons">keyboard_arrow_left</i>
          </a>
        </div>
        <div className={styles.pagetitle}>{title}</div>
        <MyAccount user={user} />
      </div>
    </div>
  );
}
