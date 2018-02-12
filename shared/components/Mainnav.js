import React from 'react';
import MyAccount from './myAccount';
import styles from './mainnav.scss';

export default function ({ user }) {
  return (
    <div className={styles.navBar}>
      <div className={styles.title}>
        <div>
          <h1>海外音悦台</h1>
          <div>
            <MyAccount user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
