import React from 'react';
import MyAccount from './myAccount';
import { inject, observer } from 'mobx-react';
import styles from './navbar.scss';


function Navbar({ store: { showNav } }) {
  if (!showNav) {
    return null;
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.title}>
        <div>
          <h1>海外音悦台</h1>
          <div>
            <MyAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default inject('store')(observer(Navbar));
