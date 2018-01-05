import React from 'react';
import { Link } from 'react-router-dom';
import MyAccount from './myAccount';
import styles from './navbar.scss';

export default function ({ title }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navInner}>
        <div>
          <Link to="/">
            <i className="material-icons">keyboard_arrow_left</i>
          </Link>
        </div>
        <div className={styles.pagetitle}>{title}</div>
        <MyAccount />
      </div>
    </div>
  );
}
