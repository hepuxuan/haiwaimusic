import React from 'react';
import MyAccount from '../../components/myAccount';
import styles from '../scss/navbar.scss';

export default function ({ user }) {
  return (
    <div className={styles.navBar}>
      <div className={styles.title}>
        <h1>海外音悦台</h1>
        <div>
          <MyAccount user={user} />
        </div>
      </div>
    </div>
  );
}
