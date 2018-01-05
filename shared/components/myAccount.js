import React from 'react';
import { inject, observer } from 'mobx-react';
import styles from './myAccount.scss';

function MyAccount({ store }) {
  return (
    <div className={styles.myAccount}>
      {
        store.user ? <a href="/auth/logout">退出</a>
          : <a href="/auth/google">登陆</a>
      }
    </div>
  );
}
export default inject('store')(observer(MyAccount));
