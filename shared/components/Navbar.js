import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import MyAccount from './myAccount';
import styles from './navbar.scss';

function Navbar({ store: { title, isIndex, showNav } }) {
  if (!showNav) {
    return null;
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.navInner}>
        {
          isIndex ? (
            <div className={styles.title}>
              <div>
                <h1>海外音悦台</h1>
                <div>
                  <MyAccount />
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div>
                <Link to="/">
                  <i className="material-icons">keyboard_arrow_left</i>
                </Link>
              </div>
              <div className={styles.pagetitle}>{title}</div>
              <MyAccount />
            </React.Fragment>
          )
        }
      </div>
    </div>
  );
}

export default inject('store')(observer(Navbar));
